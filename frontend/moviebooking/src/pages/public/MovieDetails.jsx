import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { getMovieDetails } from "../../services/movieService";
import { getShowtimesByMovieId } from "../../services/showtimeService";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(movieId);
    console.log(Number(movieId));
    if (!movieId || isNaN(movieId)) {
      setError("Invalid movie ID");
      setLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(Number(movieId));
        setMovie(movieData);
      } catch (err) {
        setError("Failed to load movie details");
      }
    };

    const fetchShowtimes = async () => {
      try {
        const showtimesData = await getShowtimesByMovieId(Number(movieId));
        setShowtimes(showtimesData);
      } catch (err) {
        setError("Failed to load showtimes");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
    fetchShowtimes();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-5">
      <h2>{movie.title}</h2>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={`assets/images/${movie.title}.jpg`} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.genre}</Card.Text>
              <Card.Text>{movie.description}</Card.Text>
              <Card.Text>Duration: {movie.duration} mins</Card.Text>
              <Card.Text>Release Date: {movie.releaseDate}</Card.Text>
              <Card.Text>Language: {movie.language}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h3>Showtimes</h3>
          {showtimes.length === 0 ? (
            <Alert variant="info">No showtimes available for this movie.</Alert>
          ) : (
            <Row>
              {showtimes.map((showtime) => (
                <Col key={showtime.showtimeId} md={6} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{showtime.screenName}</Card.Title>
                      <Card.Text>
                        Showtime: {showtime.startTime} on {showtime.date}
                      </Card.Text>
                      <Card.Text>Theater: {showtime.theaterName}</Card.Text>
                      <Button
                        variant="primary"
                        as={Link}
                        to={`/bookings/${showtime.showtimeId}`}
                      >
                        Book Now
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
