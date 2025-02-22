import axios from 'axios'
import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { useAuth } from './../../auth/authcontext';
import {toast} from 'react-toastify'
import '../../CSS/login.css'
const Login =  ()=>
{
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();


    const {isLogin,setIsLogin} = useAuth();
    const {role,setRole} = useAuth();


    const onLogin = async (e) => {
      e.preventDefault();
  
      if (email === "") {
          toast.warning("Please enter email");
      } else if (password === "") {
          toast.warning("Please enter password");
      } else {
          try {
              const response = await axios.post("http://localhost:8080/api/users/login", { email, password });
  
              // Store the authentication details
              sessionStorage["token"] = response.data.jwt;
              sessionStorage["userId"] = response.data.user.userid;
              sessionStorage["role"] = response.data.user.admin ? "Admin" : "User";
              sessionStorage["email"] = response.data.user.email;
              sessionStorage["userName"] = response.data.user.userName;
  
              setRole(sessionStorage["role"]);
              setIsLogin(true);
  
              toast.success("Login successful!");
              navigate("/");
          } catch (error) {
              if (error.response && error.response.status === 401) {
                  toast.error("Invalid email or password. Please try again.");
              } else {
                  toast.error("Something went wrong. Please try again later.");
              }
          }
      }
  };
  


    return (
        <div>
      <div className='center'>
        <h5 className='p-3 text-center bg-info rounded-top bg-gradient text-white'>
          Login
        </h5>
        <form>
          <div className='txt_field'>
            <input
              name='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span></span>
            <label>User Name</label>
          </div>
          <div className='txt_field'>
            <input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span></span>
            <label>Password</label>
          </div>
          <input type='submit' value='Login' onClick={onLogin} />
          <br />
          <br />
        </form>
      </div>
    </div>
    )
}

export default Login