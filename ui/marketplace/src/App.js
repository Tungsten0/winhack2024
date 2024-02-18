import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Wallet from './pages/Wallet';
import About from './pages/About';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Register from './pages/Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
 }

 /*MAIN*/
render() {
  const{users} = this.state;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

API_URL = "http://localhost:5038/";

componentDidMount() {
  this.refreshUsers();
}

async refreshUsers() {
  fetch(this.API_URL + "WINHACK2024/api/GetUsers").then(response => response.json())
  .then(data => {
    this.setState({users: data});
  });
}

async addClick() {
  var newUser = document.getElementById("newUser").value;
  var newPass = document.getElementById("newPass").value;
  const data = {
    AddUser: newUser,
    AddPass: newPass
  };

  fetch(this.API_URL + "WINHACK2024/api/AddUser", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
  .then(result => {
    alert(result);
    this.refreshUsers();
  });
}

async deleteClick(id) {
  fetch(this.API_URL + "WINHACK2024/api/DeleteUser?id="+id, {
    method: 'DELETE',
  }).then(response => response.json())
  .then(result => {
    alert(result);
    this.refreshUsers();
  });
}


}

export default App;
