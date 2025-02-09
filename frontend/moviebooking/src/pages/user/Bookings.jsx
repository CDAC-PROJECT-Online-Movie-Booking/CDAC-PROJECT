import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { getBookings } from "../../services/bookingService";

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load bookings");
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-5">
      <h2>My Bookings</h2>
      <Row>
        {bookings.map((booking) => (
          <Col key={booking.bookingId} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Showtime: {booking.showtime}</Card.Title>
                <Card.Text>Total Amount: ${booking.totalAmount}</Card.Text>
                <Card.Text>Status: {booking.status}</Card.Text>
                <Button variant="link" href={`/bookings/${booking.bookingId}`}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Bookings;
