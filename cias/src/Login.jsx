import React, { useState } from 'react';
import './styles/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Install bootstrap using npm install bootstrap
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/login', { email, password })
      .then(res => {
        if (res.data === "Login Successful") {
          onLogin(true, email); // Pasa el correo al componente App
        } else {
          onLogin(false);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
      <div className='p-3 bg-white w-25'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'>Email</label>
            <input
              type='email'
              placeholder='Enter Email'
              className='form-control'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='name'>Password</label>
            <input
              type='password'
              placeholder='Enter Password'
              className='form-control'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className='btn btn-success'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
