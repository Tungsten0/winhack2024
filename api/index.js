var express = require('express');
// const jsonwebtoken = require('jsonwebtoken');
// const expressJwt = require('express-jwt');

const MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');

const secret = 'grleo9ig23524ohl8f043t';

var app = express();
app.use(cors());
app.use(express.json());


// EXPRESS JWT NOT WORKING!!!!!!
// app.use(expressJwt({ secret: secret, algorithms: ['HS256'] }).unless({ path: ['/login', '/register'] }));

//TOKENS NOT TOKENINGGLDFBGI
// // Validate the user tokens with express-jwt
// app.use(expressJwt({ secret: secret }).unless({ path: ['/login', '/register'] }));

// // Define a login endpoint that generates and returns a JWT
// app.post('/login', (req, res) => {
//     // TODO: Validate the user's credentials. This is just a placeholder.
//     const { username, password } = req.body;
//     if (username === 'admin' && password === 'password') {
//       // If the credentials are valid, create a JWT and send it to the client.
//       const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
//       res.json({ token });
//     } else {
//       // If the credentials are invalid, send a 401 Unauthorized status code.
//       res.status(401).send('Invalid credentials');
//     }
// });

// app.listen(3000, () => console.log('Server started on port 3000'));

var CONNECTION_STRING = "mongodb+srv://marcoleeshi:ktSA10fagGheL15S@cluster0.yjirr9j.mongodb.net/?retryWrites=true&w=majority ";
var DBname = "marketdb";
var database;

function generateUniqueId(database, collectionName) {
    return new Promise((resolve, reject) => {
        // Generate a random number between  1 and  99999
        let uniqueId = Math.floor(Math.random() *  99999) +  1;

        // Check if the generated ID already exists in the collection
        database.collection(collectionName).findOne({ id: uniqueId }, (err, result) => {
            if (err) {
                reject(err);
            } else if (result) {
                // If the ID already exists, recursively call generateUniqueId to get a new one
                resolve(generateUniqueId(database, collectionName));
            } else {
                // If the ID does not exist, resolve the promise with the unique ID
                resolve(uniqueId);
            }
        });
    });
}

// Connect to MongoDB
MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
        return;
    }
    database = client.db(DBname);
    console.log("MongoDB Connected");

    // Express route for adding a user
    app.post('/WINHACK2024/api/AddUser', async (request, response) => {
        const newUser = request.body.AddUser;
        const newPass = request.body.AddPass;
    
        if (!newUser || !newPass) {
            return response.status(400).json({ error: "Username or password missing" });
        }
    
        try {
            // Generate a unique ID for the new user
            const newId = await generateUniqueId(database, "marketcollection");
    
            const userObject = {
                uid: NumberInt(newId), // Convert ID to string
                usern: newUser,
                passw: newPass
            };
    
            database.collection("marketcollection").insertOne(userObject, (err, result) => {
                if (err) {
                    console.error("Error adding user:", err);
                    return response.status(500).json({ error: "Error adding user" });
                }
                response.json(userObject); // Return the inserted user object
            });
        } catch (error) {
            console.error("Error generating unique ID:", error);
            response.status(500).json({ error: "Error generating unique ID" });
        }
    });

    app.post('/WINHACK2024/api/AddToCart', (request, response) => {
        console.log('Request body:', request.body);
        const newItem = request.body;

        if (!newItem.pid) { // Replace propertyName with a property your items should have
            return response.status(400).json({ error: "Invalid item data" });
        }
      
        // Assuming you have a cart collection in your MongoDB database
        database.collection("cart").insertOne(newItem, (err, result) => {
            if (err) {
              console.error("Error adding item to cart:", err);
              return response.status(500).json({ error: "Error adding item to cart" });
            }
            response.json(newItem); // Return the inserted item
          });
      });
    
    app.get('/WINHACK2024/api/GetUsers', (request, response)=>{
        database.collection("marketcollection").find({}).toArray((err, result)=>{
            response.send(result);
        });
    })

    app.put('/WINHACK2024/api/UpdateCart/:id', async (req, res) => {
        const { id } = req.params;
        const { quantity } = req.body;
      
        try {
          const cartItem = await Cart.findOne({ _id: id });
      
          if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
          }
      
          cartItem.quantity = quantity;
      
          const updatedCartItem = await cartItem.save();
      
          res.json(updatedCartItem);
        } catch (error) {
          console.error('Error updating cart item:', error);
          res.status(500).json({ message: 'Error updating cart item' });
        }
      });

    app.use(cors());

    app.get('/WINHACK2024/api/GetCatalog', (request, response) => {
        database.collection("store").find({}).toArray((err, result) => {
            response.setHeader('Content-Type', 'application/json');
            response.send(result);
        });
    });

    app.get('/WINHACK2024/api/GetCart', (request, response) => {
        database.collection("cart").find({}).toArray((err, result) => {
            response.setHeader('Content-Type', 'application/json');
            response.send(result);
        });
    });

    app.get('/WINHACK2024/api/GetCart/:id', async (req, res) => {
        console.log(`Received request for cart item with id: ${req.params.id}`);
        const { id } = req.params;
      
        try {
            const cartItem = await database.collection("cart").findOne({ _id: new require('mongodb').ObjectId(id) });
      
          if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
          }
      
          res.json(cartItem);
        } catch (error) {
          console.error('Error getting cart item:', error);
          res.status(500).json({ message: 'Error getting cart item' });
        }
      });

    app.delete('/WINHACK2024/api/DeleteUser', (request, response)=>{
        database.collection("marketcollection").deleteOne({
            id: request.query.id
        });
        response.json("User Deleted");
    })

    // Start the Express server
    const PORT = 5038;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});