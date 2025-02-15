import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Card, Form, Table } from 'react-bootstrap';

const Screen  = () => {

    const [data, setData] = useState([])
    const [screenDesc, setScreenDesc] = useState()
    const [capacity, setCapacity] = useState(1)
    const [showAdd, setShowAdd] = useState(true)
    // const [showSeat, setShowSeat] = useState(false)
    // const [screen, setScreen] = useState()
    // const [seatTypes, setSeatTypes] = useState([])
    // const [seatTypeId, setSeatTypeId] = useState()
    // const [seatCount, setSeatCount] = useState()   




    const onSubmit = (e) => {
        e.preventDefault()

        if (screenDesc == undefined) {
          toast.error("Please fail all details")
          return
        }
        axios.post("http://localhost:8080/api/screens", {
            screenDesc: screenDesc,
            capacity: capacity,
          } , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}})
          .then((resp) => {
            console.log(resp)
            toast.success("Screen added successfully")
            setScreenDesc()
            setCapacity('')
            loadData()
          })
          .catch((err) => {
            toast.error("error adding screen")
          })
      }
      
      const handleDelete = (id) => {
        axios
          .delete("http://localhost:8080/api/screens/" + id  , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}} )
          .then((resp) => {

            toast.done("Screen deleted")
            loadData()
          })
          .catch((err) => {
            toast.error("Error deleting movie")
          })
      }
      const loadData = () => {
        axios.get("http://localhost:8080/api/screens" , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}}).then((resp) => {
          setData(resp.data)
        })
      }
      useEffect(() => {
        loadData()
      }, [])



      return(
        <>
            <div className='container mt-5'>
      <div className='row'>
        <div className='col-sm-8'>
          <h5 className='p-2 text-center'>Halls List</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Screen Name</th>
                <th>Capacity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((x) => (
                <tr key={x?.screenId}>
                  <td>{x?.screenId}</td>
                  <td>{x?.screenDesc}</td>
                  <td>{x?.capacity}</td>
                  <td>
                    <Button
                      onClick={() => handleDelete(x.screenId)}
                      variant='danger'
                      size='sm'
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className='col-sm-4'>
          {showAdd && (
            <Card>
              <Card.Header className='text-center'>
                <h5>Add Screen</h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      value={screenDesc}
                      onChange={(e) => setScreenDesc(e.target.value)}
                      placeholder='Enter Screen Name'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                      type='number'
                      min='1'
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      placeholder='Enter hall capacity'
                    />
                  </Form.Group>
                  <Button
                    onClick={onSubmit}
                    variant='primary'
                    className='float-end'
                  >
                    Save Details
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </div>
        </>
      )


}

export default Screen;