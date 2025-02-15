import axios from 'axios';
import { useEffect , useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import SeatSelect from '../seatSelection/SeatSelect';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {findslot} from '../../utils/utils'

const BookNow = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const userid = sessionStorage["userId"]
    const [cost, setCost] = useState(0);
    const [occupied, setOccupied] = useState([]);
    const [showDate, setShowDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [seatNos, setSeatNos] = useState([]);
    const [show, setShow] = useState();



    const onSubmit = (e) => {
        e.preventDefault();
        if (cost === undefined || seatNos.length === 0) {
          toast.warning("Please fill all details")
          return;
        }
  
        axios
          .post("http://localhost:8080/api/bookings", {
            showId: show.showId,
            userId: parseInt(userid),
            cost: cost,
            showDate: showDate,
            noOfSeats: seatNos.length,
            seatnums: seatNos,
          } , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}} )
          .then((resp) => {
            toast.success("BookNow")
            navigate('/mybookings');
          })
          .catch((err) => {
            toast.warning("error")
          });
      };


      const loadShowBookings = () => {
        axios
          .get("http://localhost:8080/api/bookings/check" + '?showid=' + id + '&date=' + showDate  , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}})
          .then((resp) => {
            const seatsOccupied = resp.data
              .filter((x) => x.status !== 'Cancelled')
              .flatMap((row) => row?.seatnos?.split(',').map(Number) || []);
            setOccupied(seatsOccupied);
          })
          .catch((err) => console.log(err.response.data));
      };



      useEffect(() => {
        loadShowBookings();
      }, [showDate]);
    
      useEffect(() => {
        const totalCost = seatNos.length * show?.price;
        setCost(totalCost || 0);
      }, [seatNos]);
    
      useEffect(() => {
        axios
          .get("http://localhost:8080/api/shows/" + id ,  {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}}  )
          .then((resp) => setShow(resp.data))
          .catch((err) => console.log(err.response.data));
    
        loadShowBookings();
      }, []);



      return (
        <>
          <Container className="mt-5">
            <h4 className="text-center mb-4">Book Your Show</h4>
            <Row>
              <Col md={4}>
                <Card className="shadow-sm mb-4">
                  <Card.Img
                    variant="top"
                    src={"http://localhost:8080/" + show?.movie.poster}
                    alt={show?.movie.movieName}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>
                      {show?.movie.movieName} ({show?.movie.year})
                    </Card.Title>
                    <Card.Text>{show?.movie.description}</Card.Text>
                    <p>
                      <strong>Actor:</strong> {show?.movie.actor}
                    </p>
                    <p>
                      <strong>Actress:</strong> {show?.movie.actress}
                    </p>
                    <p>
                      <strong>Director:</strong> {show?.movie.director}
                    </p>
                    <hr />
                    <p>
                      <strong>Screen No:</strong> {show?.screen.screenDesc}
                    </p>
                    <p>
                      <strong>Time Slot:</strong> {findslot(show?.slot)}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={8}>
                    <SeatSelect occupied={occupied} setseatnos={setSeatNos} />
                  </Col>
                  <Col md={4}>
                    <Form
                      onSubmit={onSubmit}
                      className="bg-light p-4 rounded shadow-sm"
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Select Show Date</Form.Label>
                        <Form.Control
                          type="date"
                          min={format(new Date(), "yyyy-MM-dd")}
                          value={showDate}
                          onChange={(e) => setShowDate(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Ticket Price</Form.Label>
                        <Form.Control
                          type="text"
                          value={show?.price}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Seat Numbers</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={seatNos.join(", ")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>No Of Seats</Form.Label>
                        <Form.Control
                          type="number"
                          min={1}
                          readOnly
                          value={seatNos.length}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Total Cost</Form.Label>
                        <Form.Control type="text" disabled value={cost} />
                      </Form.Group>
                      <Button type="submit" variant="primary" className="w-100">
                        Book Now
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      );
}



export default BookNow