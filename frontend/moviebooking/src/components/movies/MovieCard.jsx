
//!!!!! DO NOT CHANGE THIS COMPONENT IT IS FINAL DESIGN !!!!!

import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Card style={{width : "300px"}}>
      <Card.Img variant="top" src={`static/images/${movie.title}.jpg`} height={400}  style={{borderLeft:100}}/>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>
        <Button as={Link} to={`/movies/${movie.movieId}`} variant="primary">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
