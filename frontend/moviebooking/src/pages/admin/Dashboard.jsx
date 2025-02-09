import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { getTotalRevenue } from "../../services/paymentService";

const Dashboard = () => {
  const { user } = useAuth();
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const data = await getTotalRevenue();
        setRevenue(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load revenue data");
        setLoading(false);
      }
    };
    fetchRevenue();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-5">
      <h2>Admin Dashboard</h2>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Total Revenue</Card.Title>
          <Card.Text>${revenue}</Card.Text>
        </Card.Body>
      </Card>
      {/* Add more admin features here */}
    </Container>
  );
};

export default Dashboard;
