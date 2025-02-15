import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, Container,Form, Table } from 'react-bootstrap'
import {FaEnvelope, FaPhone, FaUser} from 'react-icons/fa'

const UserList =  () => {
    const [data , setData ] =useState([])
    const [searchTerm , setSearchTerm] = useState('')

    const filteredData = data.filter( (user) => !user.admin && (user.userName.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())  ) );

    useEffect(  () => {
          axios.get("http://localhost:8080/api/users" , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}})
          .then((response) => {
            setData(response.data)
          })
    } , [] )


    return(
        <>
      <Container className='mt-5'>
      <Card>
        <Card.Header className='bg-primary text-white'>
          <h5 className='m-0'>Users List</h5>
        </Card.Header>
        <Card.Body>
          <Form className='mb-3'>
            <Form.Group controlId='search'>
              <Form.Control
                type='text'
                placeholder='Search by name or email...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email Id</th>
                {/* <th>Status</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr key={user.userid} className='user-row'>
                  <td>{user.userid}</td>
                  <td>
                    <FaUser  className='me-2' />
                    {user.userName}
                  </td>
                  <td>
                    <FaPhone className='me-2' />
                    {user?.mobile}
                  </td>
                  <td>
                    <FaEnvelope className='me-2' />
                    {user.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>

      
    </>
    )
}


export default UserList