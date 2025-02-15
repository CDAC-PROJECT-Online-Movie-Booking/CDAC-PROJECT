import { format, parse } from 'date-fns'
import { Link } from 'react-router-dom'
import { Card, Button, Row, Col } from 'react-bootstrap';

import { useAuth } from '../../auth/authcontext';
const UserMovieList = (props) => {

    const data = props.data

    const {isLogin} = useAuth();

    console.log('Logged in' , isLogin)

    
    
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


    

    const isUser = isLogin && sessionStorage["role"]==="User" ? true : false;

    return(
        <div className='mx-auto my-2 bg-white' style={{ width: '70%' }}>
      <h5 className='p-2 text-center'>Movies List</h5>
      {data.length > 0 ? (
        <Row>
          {data?.map((x) => (
            <Col key={x?.showId} md={4} className='mb-3'>
              <Card className='h-100 shadow'>
                <Card.Img
                  variant='top'
                  src={"http://localhost:8080/" + x?.movie.poster }
                  style={{ height: '450px', objectFit: 'fill' }}
                />
                <Card.Body>
                  <Card.Title>{x?.movie.movieName}</Card.Title>
                  <Card.Text>
                    <strong>Slot:</strong> {findslot(x?.slot)} <br />
                    <strong>screen:</strong> {x?.screen.screenDesc} <br />
                    <strong>Date:</strong>{' '}
                    {format(parse(x?.fromDate, 'yyyy-MM-dd', new Date()), 'dd-MMM-yyyy')} -
                    {format(parse(x?.toDate, 'yyyy-MM-dd', new Date()), 'dd-MMM-yyyy')}
                  </Card.Text>
                </Card.Body>
                {isUser && (
                  <Card.Footer className='text-center'>
                    <Link to={'book/' + x?.showId}>
                      <Button variant='danger' size='sm'>Book Now</Button>
                    </Link>
                  </Card.Footer>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <h5 className='text-center p-2'>No movies found</h5>
      )}
    </div>
    )



}

export default UserMovieList