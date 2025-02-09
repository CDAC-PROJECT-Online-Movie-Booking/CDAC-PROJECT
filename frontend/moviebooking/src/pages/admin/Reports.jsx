// src/pages/admin/Reports.jsx
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { getRevenueByMovie } from "../../services/reportService";

const Reports = () => {
  const { user } = useAuth();
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const data = await getRevenueByMovie();
        setRevenueData(data);
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
      <h2>Revenue Reports</h2>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Movie Title</th>
                    <th>Total Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(revenueData).map(([movieTitle, revenue]) => (
                    <tr key={movieTitle}>
                      <td>{movieTitle}</td>
                      <td>${revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
