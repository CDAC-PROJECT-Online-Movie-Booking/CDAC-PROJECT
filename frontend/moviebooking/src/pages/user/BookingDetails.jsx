import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBookingDetails,
  cancelBooking,
} from "../../services/bookingService";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingDetails(id);
        setBooking(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load booking details");
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleCancel = async () => {
    try {
      await cancelBooking(id);
      navigate("/bookings");
    } catch (err) {
      setError("Failed to cancel booking");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-5">
      <h2>Booking Details</h2>
      <Card>
        <Card.Body>
          <Card.Title>Showtime: {booking.showtime}</Card.Title>
          <Card.Text>Total Amount: ${booking.totalAmount}</Card.Text>
          <Card.Text>Status: {booking.status}</Card.Text>
          {booking.status === "PENDING" && (
            <Button variant="danger" onClick={handleCancel}>
              Cancel Booking
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingDetails;
