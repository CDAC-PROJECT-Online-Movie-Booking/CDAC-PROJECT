import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

const Reports = () => {
  const [data, setData] = useState([]);

  const loadData = () => {
    axios
      .get("http://localhost:8080/api/bookings/", {
        headers: { Authorization: `Bearer ${sessionStorage["token"]}` },
      })
      .then((resp) => {
        setData(resp.data);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container className="mt-5">
      <h5 className="p-2">Reports</h5>
      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Booking Date</th>
            <th>User Name</th>
            <th>No of Seats</th>
            <th>Show Date</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {data.map((x) => (
            <tr key={x?.bookingId}>
              <td>{x?.bookingId}</td>
              <td>{x?.bookDate}</td>
              <td>{x?.user?.userName}</td>
              <td>{x?.noOfSeats}</td>
              <td>{x?.showDate}</td>
              <td>{x?.cost}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Reports;
