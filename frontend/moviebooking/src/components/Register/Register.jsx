
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'



const Register = () => 
{
    const navigate = useNavigate()
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [email, setemail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setpassword] = useState('')



    const onRegister = async (e) =>
    {
        e.preventDefault()

        //toast is not working due to some logical error
        if(fname == "")
            {
                window.alert("please enter name")
                // toast.warn("please enter name")
            }
        else if(email == "")
        {
            window.alert("please enter email")  // this is working
            // toast.warning("please enter email")
        }
        
        else if(mobile == "")
        {
            window.alert("please enter mobile no")   
            // toast.warn("please enter mobile no")
        }else if(password=="")
        {
            window.alert("please enter password")
            // toast.warn("please enter password")
        }
        else if(password.length < 6 || password.length > 25)
        {
            window.alert("password length between 6 to 25 !")
            // toast.warn("password length between 6 to 25 !")
        }
        else {
            const userName = fname + ' ' + lname;
            const response = await axios.post("http://localhost:8080/api/users/register" ,{userName , mobile , email , password , role:"ROLE_USER" , admin:false })  //default role set admin as false

            if(response)
            {
                toast.success("Registration successfull")
                setTimeout(1000)
                navigate("/login")
            }
        }

    }


    return (
      <Container style={{ width: '70%', marginTop: '100px' }}>
      <h2 className='text-center'>User  Registration Form</h2>
      <Form>
        <Row className='mb-3'>
          <Col>
            <Form.Group controlId='formFirstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter first name'
                value={fname}
                onChange={(e) => setfname(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='formLastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter last name'
                value={lname}
                onChange={(e) => setlname(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className='mb-3' controlId='formMobileNumber'>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type='text'
            maxLength={10}
            minLength={10}
            placeholder='Enter your number'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className='text-center'>
          <Button
            variant='info'
            type='submit'
            onClick={onRegister}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Container>
    )
}

export default Register