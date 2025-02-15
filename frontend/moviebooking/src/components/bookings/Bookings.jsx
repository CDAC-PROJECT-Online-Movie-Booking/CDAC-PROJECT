import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

const Bookings = () => {
  const [data, setData] = useState([]);

  const handleCancel = (id) => {
    axios
      .delete(`http://localhost:8080/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage["token"]}` },
      })
      .then(() => {
        loadData();
      })
      .catch((err) => console.error("Error cancelling booking:", err));
  };

  const loadData = () => {
    axios
      .get("http://localhost:8080/api/bookings", {
        headers: { Authorization: `Bearer ${sessionStorage["token"]}` },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.error("Error loading bookings:", err));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container className="mt-5">
      <h5 className="p-2">All Bookings</h5>
      <Table bordered hover responsive>
        <thead className="light-dark">
          <tr>
            <th>Id</th>
            <th>Booking Date</th>
            <th>Movie Name</th>
            <th>User Name</th>
            <th>No of Seats</th>
            <th>Show Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((x) => (
            <tr key={x?.bookingId}>
              <td>{x?.bookingId}</td>
              <td>{x?.bookDate}</td>
              <td>{x?.show?.movie?.movieName || "N/A"}</td>
              <td>{x?.user?.userName || "N/A"}</td>
              <td>{x?.noOfSeats}</td>
              <td>{x?.showDate}</td>
              <td>
                <span className={`badge ${x?.status === "Booked" ? "bg-success" : "bg-secondary"}`}>
                  {x?.status}
                </span>
              </td>
              <td>
                {x?.status === "Booked" ? (
                  <Button onClick={() => handleCancel(x?.bookingId)} variant="danger" size="sm">
                    Cancel Booking
                  </Button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Bookings;
