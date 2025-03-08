import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css'

function Adminlogin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !password) {
      toast.error("Please fill out all fields.", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    axios.post('http://localhost:3001/auth/admin', { name, password })
      .then((response) => {
        if (response.data.status) {
          const i=3500;
          const delay = 3500;
          toast.success("You've successfully logged in!", {
            position: "top-center",
            autoClose: delay,
            theme: "dark",
          });
          setTimeout(() => {
            navigate('/reports');
          }, delay);
        } else if (response.data.message === "user is not registered") {
          toast.error("User is not registered", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
          });
        } else if (response.data.message === "password is incorrect") {
          toast.error("Password is incorrect", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
          });
        }
      })
      setTimeout(() => {
        navigate('/admin');
      }, i)
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <div className='signup-mainn'>
          <div id="Signup">
            <h3 className='Admin-head'>Admin Login</h3>
            <form onSubmit={handleSubmit} className="form">
              <input type='text' className="input" name="name" placeholder='Name' onChange={(e) => setName(e.target.value)} /><br />
              <input type='password' className="input" name="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br />
              <br />
              <div id="signupbtndiv">
               <Link to="/dash"> <button type='submit' id="btnsignup">Login</button></Link>
              </div>
            </form>
          </div>
          </div>
    </>
  );
}

export default Adminlogin;