import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import {
  getTheaters,
  addTheater,
  updateTheater,
  deleteTheater,
} from "../../services/adminService";
import { getCities } from "../../services/cityService";
import TheaterForm from "../../components/admin/TheaterForm";

const ManageTheaters = () => {
  const { user } = useAuth();
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const data = await getTheaters();
        setTheaters(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load theaters");
        setLoading(false);
      }
    };
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (err) {
        setError("Failed to load cities");
      }
    };
    fetchTheaters();
    fetchCities();
  }, []);

  const handleAddTheater = async (theaterData) => {
    try {
      const newTheater = await addTheater(theaterData);
      setTheaters([...theaters, newTheater]);
      setShowModal(false);
      alert("Theater added successfully!");
    } catch (err) {
      alert("Failed to add theater");
    }
  };

  const handleEditTheater = async (theaterId, theaterData) => {
    try {
      const updatedTheater = await updateTheater(theaterId, theaterData);
      setTheaters(
        theaters.map((theater) =>
          theater.theaterId === theaterId ? updatedTheater : theater
        )
      );
      setShowModal(false);
      alert("Theater updated successfully!");
    } catch (err) {
      alert("Failed to update theater");
    }
  };

  const handleDeleteTheater = async (theaterId) => {
    try {
      await deleteTheater(theaterId);
      setTheaters(
        theaters.filter((theater) => theater.theaterId !== theaterId)
      );
      alert("Theater deleted successfully!");
    } catch (err) {
      alert("Failed to delete theater");
    }
  };

  const handleCloseModal = () => {
    setSelectedTheater(null);
    setShowModal(false);
  };

  const handleShowModal = (theater) => {
    setSelectedTheater(theater);
    setShowModal(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-5">
      <h2>Manage Theaters</h2>
      <Button
        variant="success"
        className="mb-4"
        onClick={() => handleShowModal(null)}
      >
        Add New Theater
      </Button>
      <Row>
        {theaters.map((theater) => (
          <Col key={theater.theaterId} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{theater.name}</Card.Title>
                <Card.Text>{theater.address}</Card.Text>
                <Card.Text>City: {theater.cityName}</Card.Text>
                <Button
                  variant="warning"
                  onClick={() => handleShowModal(theater)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleDeleteTheater(theater.theaterId)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedTheater ? "Edit Theater" : "Add New Theater"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TheaterForm
            onSubmit={selectedTheater ? handleEditTheater : handleAddTheater}
            initialData={selectedTheater}
            cities={cities}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageTheaters;
