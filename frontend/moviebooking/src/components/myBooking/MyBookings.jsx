import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { findslot, formatDate } from "../../utils/utils";
import { Badge, Card, Container, Table } from "react-bootstrap";

const MyBookings = () => {
  const [data, setData] = useState([]);
  const handleCancel = (id) => {
    axios.get("http://localhost:8080/api/bookings/cancel/" + id , {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}}).then((resp) => {
      loadData();
    });
  };
  const loadData = () => {
    axios
      .get("http://localhost:8080/api/bookings?userid=" + sessionStorage["userId"]   ,  {headers:{Authorization: `Bearer ${sessionStorage["token"]}`}} )
      .then((resp) => {
        setData(resp.data);
      });
  };
  useEffect(() => {
    loadData();
  }, []);



  return (
    <>
      <Container className="mt-5">
        <Card className="shadow-lg p-4 rounded">
          <Card.Title className="text-center text-primary mb-4">
            Booking History
          </Card.Title>

          <div className="table-responsive">
            <Table striped hover bordered className="text-center">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>Booking Date</th>
                  <th>Movie</th>
                  <th>No of Seats</th>
                  <th>Cost</th>
                  <th>Show Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((x) => (
                  <tr key={x?.bookingId}>
                    <td>{x?.bookingId}</td>
                    <td>{formatDate(x?.bookDate)}</td>
                    <td className="d-flex align-items-center">
                      <img
                        className="rounded me-3"
                        src={"http://localhost:8080/" + x?.show?.movie?.poster}
                        alt="Movie Poster"
                        style={{
                          width: "70px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <strong>{x?.show?.movie?.movieName}</strong> (
                        {x?.show?.movie?.year}) <br />
                        {x?.show?.movie?.actor} <br />
                        {x?.show?.movie?.director}
                      </div>
                    </td>
                    <td>
                      <strong>{x?.noOfSeats}</strong>
                    </td>
                    <td>
                      <strong>₹{x?.cost}</strong>
                    </td>
                    <td>
                      {formatDate(x?.showDate)} <br />
                      <Badge bg="info">{findslot(x?.show?.slot)}</Badge>
                    </td>
                    <td>
                      <Badge
                        bg={x?.status === "Confirmed" ? "success" : "danger"}
                      >
                        {x?.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>
    </>
  );

}


export default MyBookings