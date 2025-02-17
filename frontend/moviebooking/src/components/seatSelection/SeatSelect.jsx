import ShowCase from './ShowCase';
import Cinema from './Cinema';
import { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
const rows = 8;

const SeatSelect = ({ occupied, setseatnos }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    return (
        <>
          <div className="seat-selection">
            <Container
              className="p-4"
              style={{
                backgroundColor: "black",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ShowCase />
              <Cinema
                occupied={occupied}
                selectedSeats={selectedSeats}
                onSelectedSeatsChange={(selectedSeats) => {
                  setSelectedSeats(selectedSeats);
                  setseatnos(selectedSeats);
                }}
                rows={rows}
              />
              <Alert variant="dark" className="mt-3 text-light">
                Total seats allotted for you is{" "}
                <span className="count">{selectedSeats.length}</span>
              </Alert>
            </Container>
          </div>
        </>
      );

}


export default SeatSelect