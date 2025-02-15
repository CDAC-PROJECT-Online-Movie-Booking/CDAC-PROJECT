import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import { toast } from "react-toastify"
import { format } from 'date-fns';



const Shows = () => {
    const [data, setData] = useState([])
    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()
    const [slot, setslot] = useState()
    const [price,setprice]=useState()
    const [screenId, setscreenId] = useState()
    const [movieId, setmovieId] = useState()
    const [movies, setmovies] = useState([])
    const [screen, setScreen] = useState([])
  
    const onSubmit = (e) => {
      e.preventDefault()
      if (fromdate == undefined) {
        toast.error("Select date")
        return
      }
      axios
        .post("http://localhost:8080/api/shows", {
          fromDate: fromdate,
          screenId: screenId,
          movieId: movieId,
          toDate: todate,
          slot,
          price
        })
        .then((resp) => {
          console.log(resp)
          toast.success("Show Added")

          setfromdate('')
          setslot('')
          settodate('')
          setscreenId('')
          setmovieId('')
          setprice('')
          loadData()

        })
        .catch((err) => {
          toast.error("error adding show")
        })
    }
    const findslot = (id) => {
      switch (id) {
        case 1:
          return '09:00AM to 12:00PM'
        case 2:
          return '12:00PM to 03:00PM'
        case 3:
          return '03:00PM to 06:00PM'
        case 4:
          return '06:00PM to 09:00PM'
        case 5:
          return '09:00PM to 12:00PM'
      }
    }
    const handleDelete = (id) => {
      axios
        .delete('http://localhost:8080/api/shows/' + id)
        .then((resp) => {
          toast.done("Show deleted")
          loadData()
        })
        .catch((err) => {
          toast.error("Error deleting show")
        })
    }
    const loadData = () => {
      axios.get("http://localhost:8080/api/shows" , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}} ).then((resp) => {
        setData(resp.data)
      })    
    }
    useEffect(() => {
      axios.get("http://localhost:8080/api/movies" , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}}).then((resp) => {
        setmovies(resp.data)
      })
      axios.get("http://localhost:8080/api/screens" , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}} ).then((resp) => {
        setScreen(resp.data)
      })
      loadData()
    }, [])


    return (
        <Container className='mt-5'>
      <Row>
        <Col sm={8}>
          <h5 className='p-2'>Shows List</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Movie Name</th>
                <th>Screen Details</th>
                <th>Show Details</th>
                <th>Ticket</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((x) => (
                <tr key={x?.showId}>
                  <td>{x?.showId}</td>
                  <td>{x?.movie.movieName}</td>
                  <td>{x?.screen.screenDesc}</td>
                  <td>{findslot(x?.slot)}</td>
                  <td>{x?.price}</td>
                  <td>
                    {x?.fromDate} - {x?.toDate}
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(x.showId)}
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
        </Col>
        <Col sm={4}>
          <h5>Add Show</h5>
          <Form>
            <Form.Group className='mb-2'>
              <Form.Label>Movie</Form.Label>
              <Form.Select
                value={movieId}
                onChange={(e) => setmovieId(e.target.value)}
              >
                <option value=''>Select Movie</option>
                {movies.map((x) => (
                  <option key={x.movieId} value={x.movieId} > {x.movieName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Screen</Form.Label>
              <Form.Select
                value={screenId}
                onChange={(e) => setscreenId(e.target.value)}
              >
                <option value=''>Select Screen</option>
                {screen.map((x) => (
                  <option key={x.screenId} value={x.screenId}>{x.screenDesc}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Ticket Price</Form.Label>
              <Form.Control
                type='number'
                value={price}
                placeholder='Ticket Price'
                onChange={(e) => setprice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Time Slot</Form.Label>
              <Form.Select
                value={slot}
                onChange={(e) => setslot(e.target.value)}
              >
                <option value=''>Select Time Slot</option>
                <option value='1'>09:00AM to 12:00PM</option>
                <option value='2'>12:00PM to 03:00PM</option>
                <option value='3'>03:00PM to 06:00PM</option>
                <option value='4'>06:00PM to 09:00PM</option>
                <option value='5'>09:00PM to 12:00AM</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type='date'
                min={format(new Date(), 'yyyy-MM-dd')}
                value={fromdate}
                onChange={(e) => setfromdate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type='date'
                min={format(new Date(), 'yyyy-MM-dd')}
                value={todate}
                onChange={(e) => settodate(e.target.value)}
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
        </Col>
      </Row>
    </Container>
    )


    


}

export default Shows