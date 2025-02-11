// import { useState } from 'react'
// import axios from 'axios'
// import '../components/userLogin.css'
// import { Link, useNavigate } from 'react-router-dom'
// import swal from 'sweetalert2'
// import { useDispatch } from 'react-redux'
// import { apiUrls, baseUrl } from '../lib/constants'

// function Login() {
//   const navigate = useNavigate()
//   const [userid, setuserid] = useState('')
//   const [password, setPassword] = useState('')
//   const dispatch = useDispatch()

//   const handleForm = (e) => {
//     e.preventDefault()
//     if (userid === '') {
//       swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'please enter valid details!',
//       })
//     } else if (password === '') {
//       swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'please enter password',
//       })
//     } else {
//       checkUser()
//     }
//   }

//   const checkUser = async () => {
//     await axios
//       .post(baseUrl+apiUrls.LOGIN_URL, {
//         userid: userid,
//         password: password,
//       })
//       .then((resp) => {
//         sessionStorage.setItem('uname', resp.data.userName)
//         sessionStorage.setItem('role', resp.data.admin ? 'Admin' : 'User')
//         sessionStorage.setItem('userid', resp.data.email)
//         sessionStorage.setItem('id', resp.data.userid)
//         dispatch({ type: 'IsLoggedIn' })
//         swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: 'Welcome ' + resp.data.userName,
//           showConfirmButton: false,
//           timer: 1500,
//         })
//         navigate('/')
//       })
//       .catch((error) => {
//         swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: error.response.data,
//         })
//       })
//   }

//   return (
//     <div>
//       <div className='center'>
//         <h5 className='p-3 text-center bg-info rounded-top bg-gradient text-white'>
//           Login
//         </h5>
//         <form>
//           <div className='txt_field'>
//             <input
//               name='email'
//               type='text'
//               value={userid}
//               onChange={(e) => setuserid(e.target.value)}
//             />
//             <span></span>
//             <label>User Name</label>
//           </div>
//           <div className='txt_field'>
//             <input
//               name='password'
//               type='password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <span></span>
//             <label>Password</label>
//           </div>
//           <input type='submit' value='Login' onClick={handleForm} />
//           <br />
//           <br />
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login

// import { useState } from 'react'
// import axios from 'axios'
// import '../components/userLogin.css'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { apiUrls, baseUrl } from '../lib/constants'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// function Login() {
//   const navigate = useNavigate()
//   const [userid, setuserid] = useState('')
//   const [password, setPassword] = useState('')
//   const dispatch = useDispatch()

//   const handleForm = (e) => {
//     e.preventDefault()
//     if (userid === '') {
//       toast.error('Please enter valid details!', {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       })
//     } else if (password === '') {
//       toast.error('Please enter password', {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       })
//     } else {
//       checkUser()
//     }
//   }

//   const checkUser = async () => {
//     await axios
//       .post(baseUrl + apiUrls.LOGIN_URL, {
//         userid: userid,
//         password: password,
//       })
//       .then((resp) => {
//         sessionStorage.setItem('uname', resp.data.userName);
//         sessionStorage.setItem('role', resp.data.admin ? 'Admin' : 'User');
//         sessionStorage.setItem('userid', resp.data.email);
//         sessionStorage.setItem('id', resp.data.userid);
//         dispatch({ type: 'IsLoggedIn' });
  
//         toast.success(`Welcome ${resp.data.userName}`, {
//           position: 'top-center',
//           autoClose: 1000,  // Reduced to 1 second
//         });
  
//         setTimeout(() => {
//           navigate('/');
//         }, 1200);  // Slightly more than autoClose to ensure visibility
//       })
//       .catch((error) => {
//         toast.error(error.response.data, {
//           autoClose: 1000,  // Reduced timeout for error message too
//         });
//       });
//   };
  
  

//   return (
//     <div>
//       <ToastContainer />
//       <div className='center'>
//         <h5 className='p-3 text-center bg-info rounded-top bg-gradient text-white'>
//           Login Here
//         </h5>
//         <form>
//           <div className='txt_field'>
//             <input
//               name='email'
//               type='text'
//               value={userid}
//               onChange={(e) => setuserid(e.target.value)}
//             />
//             <span></span>
//             <label>Email</label>
//           </div>
//           <div className='txt_field'>
//             <input
//               name='password'
//               type='password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <span></span>
//             <label>Password</label>
//           </div>
//           <input type='submit' value='Login' onClick={handleForm} />
//           <br />
//           <br />
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login

import { useState } from 'react';
import API from '../lib/constants'; // Importing configured API instance
import '../components/userLogin.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { apiUrls } from '../lib/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const handleForm = (e) => {
    e.preventDefault();
    if (!userid.trim()) {
      toast.error('Please enter a valid username/email.');
      return;
    }
    if (!password.trim()) {
      toast.error('Please enter your password.');
      return;
    }
    authenticateUser();
  };

  const authenticateUser = async () => {
    try {
      const response = await API.post(apiUrls.LOGIN_URL, { userid, password });

      // const { token, userName, email, userid: userId, admin } = response.data;

      // // Store JWT token and user details
      // sessionStorage.setItem('token', token);
      // sessionStorage.setItem('uname', userName);
      // sessionStorage.setItem('role', admin ? 'Admin' : 'User');
      // sessionStorage.setItem('userid', email);
      // sessionStorage.setItem('id', userId);

      const { token, user_id: userId, role, sub: email } = response.data; // Fix field names

      // Store JWT token and user details
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('uname', email);  // No username in backend, so using email
      sessionStorage.setItem('role', role); // Store the actual role
      sessionStorage.setItem('userid', email);
      sessionStorage.setItem('id', userId);

      dispatch({ type: 'IsLoggedIn' });

      toast.success(`Welcome, ${email}!`, { autoClose: 1500 });

    setTimeout(() => {
      navigate(role === "ROLE_ADMIN" ? '/' : '/'); // Fix admin check
    }, 1600);
  } catch (error) {
    toast.error(error.response?.data || 'Login failed. Please try again.');
  }

    //   toast.success(`Welcome, ${userName}!`, { autoClose: 1500 });

    //   setTimeout(() => {
    //     navigate(admin ? '/' : '/');
    //   }, 1600);
    // } catch (error) {
    //   toast.error(error.response?.data || 'Login failed. Please try again.');
    // }
  };

  return (
    <div>
      <ToastContainer />
      <div className='center'>
        <h5 className='p-3 text-center bg-info rounded-top bg-gradient text-white'>
          Login Here
        </h5>
        <form onSubmit={handleForm}>
          <div className='txt_field'>
            <input
              type='text'
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              required
            />
            <span></span>
            <label>Email/Username</label>
          </div>
          <div className='txt_field'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span></span>
            <label>Password</label>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
