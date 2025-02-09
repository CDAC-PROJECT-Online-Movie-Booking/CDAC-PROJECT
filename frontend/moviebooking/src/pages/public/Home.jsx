import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../../components/movies/MovieCard";
import { getMovies } from "../../services/movieService";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

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

  return (
    <Container>
      <h1 className="my-4">Now Showing</h1>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.movieId} md={4} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
