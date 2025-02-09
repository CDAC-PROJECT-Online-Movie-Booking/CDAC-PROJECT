// src/components/admin/TheaterForm.jsx
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const TheaterForm = ({ onSubmit, initialData, cities, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      address: "",
      cityId: null,
    }
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(initialData ? formData.theaterId : null, formData);
      onCancel();
    } catch (err) {
      setError("Failed to save theater");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formBasicName">
        <Form.Label>Theater Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter theater name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicCity">
        <Form.Label>City</Form.Label>
        <Form.Select
          name="cityId"
          value={formData.cityId}
          onChange={handleChange}
          required
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.cityId} value={city.cityId}>
              {city.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        {initialData ? "Update Theater" : "Add Theater"}
      </Button>
      <Button variant="secondary" className="ms-2" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default TheaterForm;
