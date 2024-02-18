import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  //DOESNT WORK
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
      // Store the token in localStorage
      localStorage.setItem('authToken', data.token);
      // Redirect to the home page
      history.push('/home');
    } else {
      // Handle error (e.g., show an error message)
      console.error('Login failed:', data.message);
    }
  };

  return (
    <div> {/* Add a parent div element */}
      <section className="Login" class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Login img"/>
            </div>

            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h1>Marketplace Login</h1>
              <form onSubmit={handleSubmit}> {/* Uncomment onSubmit */}
                <div class="form-outline mb-4">
                  <input type="text" id="setUsername" class="form-control form-control-lg" />
                  <label class="form-label" for="setUsername">Username</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form1Example23" class="form-control form-control-lg" />
                  <label class="form-label" for="form1Example23">Password</label>
                </div>

                <div class="d-flex justify-content-around align-items-center mb-4">
                  <Button type="submit" class="btn btn-primary btn-lg btn-block">Sign in</Button>
                </div>

                <Link to="/register">
                <a href="#!">Not a member?</a>
                </Link>
                

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}