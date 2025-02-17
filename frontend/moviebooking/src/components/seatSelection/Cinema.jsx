import clsx from "clsx";
import { Card } from "react-bootstrap";

export default function Cinema({ occupied, selectedSeats, onSelectedSeatsChange, rows }) {
  const seats = Array.from({ length: 8 * rows }, (_, i) => i);

  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }


    return (
      <>
        <div className="Cinema">
          <Card className="mb-4">
            <Card.Body>
              <div
                className="screen"
                style={{
                  backgroundColor: "#333",
                  height: "20px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                }}
              />
              <div className="seats d-flex flex-wrap justify-content-center">
                {seats.map((seat) => {
                  const isSelected = selectedSeats.includes(seat);
                  const isOccupied = occupied.includes(seat);
                  return (
                    <span
                      tabIndex="0"
                      key={seat}
                      className={clsx(
                        "seat",
                        isSelected && "selected",
                        isOccupied && "occupied"
                      )}
                      onClick={
                        isOccupied ? null : () => handleSelectedState(seat)
                      }
                      onKeyPress={
                        isOccupied
                          ? null
                          : (e) => {
                              if (e.key === "Enter") {
                                handleSelectedState(seat);
                              }
                            }
                      }
                      style={{
                        width: "30px",
                        height: "30px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: isOccupied
                          ? "#dc3545"
                          : isSelected
                          ? "#007bff"
                          : "#28a745",
                        cursor: isOccupied ? "not-allowed" : "pointer",
                        display: "inline-block",
                      }}
                    />
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        </div>
      </>
    );

}
