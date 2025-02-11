// import React, { useState } from 'react'
// import axios from 'axios'
// // import '../components/3.css'
// import '../components/register.css'
// import { useNavigate } from 'react-router-dom'
// import swal from 'sweetalert2'
// import { apiUrls, baseUrl } from '../lib/constants'

// export default function CustomerRegister() {
//   return (
//     <div>
//       <CustomerTable />
//     </div>
//   )
// }

// function CustomerTable() {
//   const navigate = useNavigate()
//   const [fname, setfname] = useState('')
//   const [lname, setlname] = useState('')
//   const [email, setemail] = useState('')
//   const [phone, setphones] = useState('')
//   const [password, setpassword] = useState('')

//   const handleForm = (e) => {
//     e.preventDefault()
//     if (email === '') {
//       swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'please enter valid details!',
//       })
//     } else if (phone === '') {
//       swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'please enter Contact Number',
//       })
//     } else if (password === '') {
//       swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'please enter password',
//       })
//     } else if (password.length < 6 || password.length > 15) {
//       swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Password length is min 6 and max length is 15',
//       })
//     } else {
//       submit()
//     }
//   }
//   const submit = async () => {
//     await axios
//       .post(baseUrl+apiUrls.REGISTER_URL, {
//         userName: fname + ' ' + lname,
//         email: email,
//         password: password,
//         mobile: phone,
//       })
//       .then((resp) => {
//         swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: 'Registered Successfully',
//           showConfirmButton: false,
//           timer: 1500,
//         })
//         navigate('/login')
//       })
//       .catch((error) => {
//         swal.fire({
//           position: 'center',
//           icon: 'error',
//           title: error.response.data,
//           showConfirmButton: false,
//           timer: 1500,
//         })
//       })
//   }

//   return (
//     <div className='container' style={{ width: '30%', marginTop: '100px' }}>
//       <div className='title text-center'>User Registration Form</div>
//       <form>
//         <div className='user-details'>
//           <div className='input-box'>
//             <span className='details'>First Name</span>
//             <input
//               type='text'
//               placeholder='Enter first name'
//               value={fname}
//               onChange={(e) => setfname(e.target.value)}
//               required
//             />
//           </div>
//           <div className='input-box'>
//             <span className='details'>Last Name</span>
//             <input
//               type='text'
//               placeholder='Enter last name'
//               value={lname}
//               onChange={(e) => setlname(e.target.value)}
//               required
//             />
//           </div>
//           <div className='input-box'>
//             <span className='details'>Mobile Number</span>
//             <input
//               type='text'
//               maxLength={10}
//               minLength={10}
//               placeholder='Enter your number'
//               id='mobileNo'
//               value={phone}
//               onChange={(e) => setphones(e.target.value)}
//               required
//             />
//           </div>

//           <div className='input-box'>
//             <span className='details'>Email</span>
//             <input
//               type='email'
//               placeholder='Enter your email'
//               id='emailid'
//               value={email}
//               onChange={(e) => setemail(e.target.value)}
//               required
//             />
//           </div>
//           <div className='input-box'>
//             <span className='details'>Password</span>
//             <input
//               type='password'
//               placeholder='Enter your password'
//               id='password'
//               value={password}
//               onChange={(e) => setpassword(e.target.value)}
//               required
//             />
//           </div>
//         </div>
//         <div className='button' style={{ margin: 'auto' }}>
//           <input
//             type='submit'
//             value='Submit'
//             onClick={handleForm}
//           />
//         </div>
//       </form>
//     </div>
//   )
// }


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'
import API, {apiUrls } from '../lib/constants'
import '../components/register.css'

export default function CustomerRegister() {
  return (
    <div>
      <CustomerTable />
    </div>
  )
}

function CustomerTable() {
  const navigate = useNavigate()
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleForm = (e) => {
    e.preventDefault()
    if (!email) {
      showAlert('error', 'Oops...', 'Please enter a valid email!')
    } else if (!phone) {
      showAlert('error', 'Oops...', 'Please enter your contact number!')
    } else if (!password) {
      showAlert('error', 'Oops...', 'Please enter a password!')
    } else if (password.length < 6 || password.length > 15) {
      showAlert('error', 'Oops...', 'Password length should be between 6 and 15 characters!')
    } else {
      submit()
    }
  }

  const submit = async () => {
    try {
      await API.post(apiUrls.REGISTER_URL, {
        userName: `${fname} ${lname}`,
        email: email,
        password: password,
        mobile: phone,
      })
      showAlert('success', 'Success!', 'Registered Successfully', true)
      navigate('/login')
    } catch (error) {
      showAlert('error', 'Error!', error.response?.data || 'Registration failed!')
    }
  }

  const showAlert = (icon, title, text, autoClose = false) => {
    swal.fire({
      icon: icon,
      title: title,
      text: text,
      position: 'center',
      showConfirmButton: !autoClose,
      timer: autoClose ? 1500 : undefined,
    })
  }

  return (
    <div className='container' style={{ width: '30%', marginTop: '100px' }}>
      <div className='title text-center'>User Registration Form</div>
      <form>
        <div className='user-details'>
          <div className='input-box'>
            <span className='details'>First Name</span>
            <input
              type='text'
              placeholder='Enter first name'
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Last Name</span>
            <input
              type='text'
              placeholder='Enter last name'
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Mobile Number</span>
            <input
              type='text'
              maxLength={10}
              minLength={10}
              placeholder='Enter your number'
              id='mobileNo'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className='input-box'>
            <span className='details'>Email</span>
            <input
              type='email'
              placeholder='Enter your email'
              id='emailid'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Password</span>
            <input
              type='password'
              placeholder='Enter your password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='button' style={{ margin: 'auto' }}>
          <input
            type='submit'
            value='Submit'
            onClick={handleForm}
          />
        </div>
      </form>
    </div>
  )
}

