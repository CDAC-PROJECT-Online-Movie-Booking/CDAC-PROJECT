import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap"
import { toast } from "react-toastify"

const AdminMovieList = () => {

    const [data, setData] = useState([])
    const [movieName, setmovieName] = useState()
    const [actor,setactor]=useState()
    const [actoress,setactoress]=useState()
    const [director,setdirector]=useState()
    const [description,setdescription]=useState()
    const [year,setyear]=useState()
    const [movieid,setmovieid]=useState(0)
    const [selectedPhoto, setSelectedPhoto] = useState(null)




    const onSubmit = (e) => {
        e.preventDefault()
        if (movieName === undefined || year===undefined || description === undefined ||
          actor === undefined || actoress === undefined || director === undefined) {

            toast.error("Please fill all details")
        
          return
        }
        const formData = new FormData()
        formData.append('photo', selectedPhoto)
        formData.append('movieName', movieName)
        formData.append('year', year)
        formData.append('actor', actor)
        formData.append('actress', actoress)
        formData.append('director', director)
        formData.append('description', description)
        formData.append('movieId',movieid)
        axios
          .post("http://localhost:8080/api/movies", formData  , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}} )
          .then((resp) => {
            console.log(resp)
            
            toast.success("Movie added Successfully")
            
            setmovieName('')
            setactor('')
            setactoress('')
            setdirector('')
            setyear('')
            setdescription('')
            setmovieid(0)
            setSelectedPhoto(null)
            loadData()
          })
          .catch((err) => {
            toast("Error saving movie")
          })
    }


    const handleEdit = (movie) =>{
        setmovieName(movie.movieName)
        setyear(movie.year)
        setactor(movie.actor)
        setactoress(movie.actress)
        setdirector(movie.director)
        setdescription(movie.description)
        setmovieid(movie.movieId)
    }
  
    const handleDelete = (id) => {
      axios
        .delete("http://localhost:8080/api/movies/" + id , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}})
        .then((resp) => {
          toast.done("movie deleted")
          loadData()
        })
        .catch((err) => {
          toast.error("error deleting movie")
        })
    }


    const handleFileInput = (e) => {
        setSelectedPhoto(e.target.files[0])
      }



      const loadData = () => {
        axios.get("http://localhost:8080/api/movies" , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}} ).then((resp) => {
          setData(resp.data)
        })
      }


      useEffect(() => {
        loadData()
      }, [])


      return(
        <>

<Container className='mt-5'>
          <Row>
            <Col sm={8}>
              <Card>
                <Card.Header className='bg-primary text-white'>
                  <h5 className='m-0'>Movies List</h5>
                </Card.Header>
                <Card.Body>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Movie Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((x) => (
                        <tr key={x?.movieId} className='user-row'>
                          <td>{x?.movieId}</td>
                          <td>
                            <img
                              className='float-start me-2'
                              src={'http://localhost:8080/' + x?.poster}
                              style={{
                                width: '100px',
                                height: '120px',
                              }}
                              alt={x?.movieName}
                            />
                            <div>
                              <strong>{x?.movieName}</strong><br />
                              <span>Actors: {x?.actor}</span><br />
                              <span>Actress: {x?.actress}</span>
                            </div>
                          </td>
                          <td>
                            <Button
                              onClick={() => handleDelete(x.movieId)}
                              variant='danger'
                              size='sm'
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={() => handleEdit(x)}
                              variant='primary'
                              size='sm'
                              className='ms-2'
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4}>
              <Card>
                <Card.Header>
                  <h5 className='m-0'>Add Movie</h5>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className='mb-2'>
                      <Form.Label>Movie Name</Form.Label>
                      <Form.Control
                        type='text'
                        value={movieName}
                        onChange={(e) => setmovieName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                      <Form.Label>Actors Name</Form.Label>
                      <Form.Control
                        type='text'
                        value={actor}
                        onChange={(e) => setactor(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                      <Form.Label>Actresses Name</Form.Label>
                      <Form.Control
                        type='text'
                        value={actoress}
                        onChange={(e) => setactoress(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                      <Form.Label>Director Name</Form.Label>
                      <Form.Control
                        type='text'
                        value={director}
                        onChange={(e) => setdirector(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                      <Form.Label>Release Year</Form.Label>
                      <Form.Control
                        type='number'
                        value={year}
                        onChange={(e) => setyear(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                      <Form.Label>Movie Poster</Form.Label>
                      <Form.Control
                        type='file'
                        onChange={handleFileInput}
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
            </Col>
          </Row>
        </Container>
        
        </>
      )

}

export default AdminMovieList