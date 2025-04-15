import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import "../styles/login.css"
import axios from 'axios'


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
      
        console.log('Form submitted: ', email, password);
        axios.post('http://localhost:5050/api/login', {email, password})
        .then((res)=>{
            console.log(res)
            
            if((res.status === 200 || res.status === 201) && res.data.message === 'Login Successfull' ){
                alert(res.data.message)
                navigate("/menu")
                localStorage.setItem('user-name', res.data.data.fullname)
                localStorage.setItem('user-email', res.data.data.email)
                localStorage.setItem('user-role', res.data.data.role)

                console.log('Navigate to Menu')
            }
            else{
                alert(res.data.message)
            }
        })

       
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return (
        <div id="LoginForm">
            <div className="floating-food">🍔</div>
            <div className="floating-food">🍣</div>
            <div className="floating-food">🍕</div>

            <div className="auth-container">
                <div className="logo">GourmetExpress</div>
                
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="input-group">
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder=" " 
                        />
                        <label>Email Address</label>
                    </div>

                    <div className="input-group">
                       
                        <input type={showPassword ? "text" : "password"} id="password" placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)}   required />
                        <label>Password</label>
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`} onClick={togglePasswordVisibility}></i>
                       
                    </div>

                    <button type="submit" className="submit-btn">Sign In</button>
                    <div className="auth-switch">
                        New user? <Link to='/register'>Create account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
