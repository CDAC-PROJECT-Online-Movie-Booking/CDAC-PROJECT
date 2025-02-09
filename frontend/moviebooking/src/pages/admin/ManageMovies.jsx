import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../../services/movieService";
import MovieForm from "../../components/admin/MovieForm";

const ManageMovies = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load movies");
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleAddMovie = async (movieData) => {
    try {
      const newMovie = await addMovie(movieData);
      setMovies([...movies, newMovie]);
      setShowForm(false);
    } catch (err) {
      setError("Failed to add movie");
    }
  };

  const handleEditMovie = async (id, movieData) => {
    try {
      const updatedMovie = await updateMovie(id, movieData);
      setMovies(
        movies.map((movie) => (movie.movieId === id ? updatedMovie : movie))
      );
      setShowForm(false);
      setEditingMovie(null);
    } catch (err) {
      setError("Failed to update movie");
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      setMovies(movies.filter((movie) => movie.movieId !== id));
    } catch (err) {
      setError("Failed to delete movie");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Manage Movies</h2>
      <Button
        variant="success"
        className="mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Add/Edit Movie"}
      </Button>
      {showForm && (
        <MovieForm
          onSubmit={editingMovie ? handleEditMovie : handleAddMovie}
          initialData={editingMovie}
          onCancel={() => {
            setShowForm(false);
            setEditingMovie(null);
          }}
        />
      )}
      <Row>
        {movies.map((movie) => (
          <Col key={movie.movieId} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.genre}</Card.Text>
                <Button
                  variant="warning"
                  onClick={() => {
                    setEditingMovie(movie);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleDeleteMovie(movie.movieId)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ManageMovies;
