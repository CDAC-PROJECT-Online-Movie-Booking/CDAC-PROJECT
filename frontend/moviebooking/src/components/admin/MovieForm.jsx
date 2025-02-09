import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const MovieForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      genre: "",
      duration: 0,
      releaseDate: "",
      language: "",
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(initialData ? formData.movieId : null, formData);
      onCancel();
    } catch (err) {
      console.error("Form submission failed:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicGenre">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicDuration">
        <Form.Label>Duration (minutes)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicReleaseDate">
        <Form.Label>Release Date</Form.Label>
        <Form.Control
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicLanguage">
        <Form.Label>Language</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter language"
          name="language"
          value={formData.language}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {initialData ? "Update Movie" : "Add Movie"}
      </Button>
      <Button variant="secondary" className="ms-2" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default MovieForm;
