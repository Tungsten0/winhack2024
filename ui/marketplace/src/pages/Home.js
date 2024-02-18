import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
    let existingItem = null;
    
    if (existingItemIndex >=  0) {
      // If the item is already in the cart, increment its quantity
      const updatedCart = [...cart];
      const existingItem = updatedCart[existingItemIndex];
      existingItem.quantity +=  1;
  
      // Update the cart state
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it with quantity  1
      setCart([...cart, { ...item, quantity:  1 }]);
    }
    
    // Send the updated item to the server to persist the cart
    sendItemToServer({ ...item, quantity: existingItem ? existingItem.quantity +  1 :  1 });
  };

  const notify = (item) => toast(`${item.item} added to cart!`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const sendItemToServer = async (item) => {
    try {
      // Check if the item already exists in the cart
      console.log(`Fetching cart item with id: ${item._id}`);
      const response = await fetch(`http://localhost:5038/WINHACK2024/api/GetCart/${item._id}`);
      if (response.ok) {
        // If the item exists, update its quantity
        const existingItem = await response.json();
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        const updateResponse = await fetch(`http://localhost:5038/WINHACK2024/api/UpdateCart/${item._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedItem)
        });
        if (!updateResponse.ok) {
          throw new Error(`Error updating item quantity: ${updateResponse.status} ${updateResponse.statusText}`);
        }
        console.log('Item quantity updated:', await updateResponse.json());
      } else {
        // If the item doesn't exist, add it to the cart
        const addResponse = await fetch('http://localhost:5038/WINHACK2024/api/AddToCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...item, quantity: 1 })
        });
        if (!addResponse.ok) {
          throw new Error(`Error adding item to cart: ${addResponse.status} ${addResponse.statusText}`);
        }
        console.log('Item added to cart:', await addResponse.json());
      }
      notify(item);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetch('http://localhost:5038/WINHACK2024/api/GetCatalog')
  .then(response => response.json())
  .then(data => {
    setCatalog(data);
  })
  .catch(error => {
    console.error('Error fetching catalog:', error);
  });
  }, []);
  
  const pad = {
    padding: '50px'
  };
return (
<>
<Header />
<section className='container' style={pad}>
<div>
  <h1>Windsor's Marketplace</h1>
</div>
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {catalog.map(item => (
            <div key={item._id} className="col">
              <div className="card h-100">
                <img src={item.url} className="card-img-top" alt={item.item} />
                <div className="card-body">
                  <h5 className="card-title">{item.item}</h5>
                  <p className="card-text">Price: ${item.price}</p>
                  <p className="card-text">Inventory: {item.inv}</p>
                  <button className="btn btn-primary" onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </section>
<Footer />
</>
)
}