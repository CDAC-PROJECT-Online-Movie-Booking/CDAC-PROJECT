import { ListGroup } from "react-bootstrap";

const ShowCase = () => {
  return (
    <>
      <ListGroup className="ShowCase mt-5">
        <ListGroup.Item className="d-flex align-items-center">
          <span className="seat" style={{ marginRight: "10px" }} />
          <small>Available</small>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
          <span className="seat selected" style={{ marginRight: "10px" }} />
          <small>Selected</small>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
          <span className="seat occupied" style={{ marginRight: "10px" }} />
          <small>Occupied</small>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};



export default ShowCase
