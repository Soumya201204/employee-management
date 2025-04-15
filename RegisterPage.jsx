import "../styles/register.css"
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const RegisterForm = () => {
  const [fullname, setFullname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [showPassword, setShowPassword] = useState(false);

  let navigate = useNavigate()

 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", fullname, email, password);
    axios.post('http://localhost:5050/api/register', {fullname, email, password})
    .then(function(res){
      console.log(res)
      if(res.status === 201 || res.status === 200){
        console.log('Data is created successfully')
        alert('User is Registered Successfully')
        navigate('/login')
      }
      else{
        alert('Failed to register... Try after some time')
      }
    })
    .catch(function(){
      console.log('Got some error while registering data')
    })
  };

  return (
    <div id="RegisterForm">
        <div className="auth-container">
      <div className="logo">GourmetExpress</div>
      <form className="auth-form" >
        <div className="input-group">
          <input type="text" id="fullname" placeholder=" " value={fullname} onChange={(e)=>{setFullname(e.target.value)}}  required />
          <label htmlFor="fullname">Full Name</label>
        </div>
        <div className="input-group">
          <input type="email" id="email" placeholder=" " value={email} onChange={(e)=>{setEmail(e.target.value)}}  required />
          <label htmlFor="email">Email Address</label>
        </div>
        <div className="input-group">
          <input type={showPassword ? "text" : "password"} id="password" placeholder=" " value={password} onChange={(e)=>{setPassword(e.target.value)}}  required />
          <label htmlFor="password">Password</label>
          <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`} onClick={togglePasswordVisibility}></i>
        </div>
        <button type="submit" className="submit-btn" onClick={handleSubmit}>Create Account</button>
        <div className="auth-switch">
          Already have an account? <Link to='/login'>Sign in</Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default RegisterForm;
