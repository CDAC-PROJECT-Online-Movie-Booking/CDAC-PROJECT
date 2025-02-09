import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { verify } from "../../services/authService";
const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const email = sessionStorage.getItem("userEmail");
  const  handleSubmit = async (e) => {
    e.preventDefault();

    try{
    
       const status = await verify(email , otp)
       console.log(status)
      if(status["message"] === "success")
      {
        navigate("/login")
      }
      else{
        window.alert("invalid otp. Please enter again")
      }
      

    }
    catch(ex)
    {
      setError("Invalid OTP ! ! !");
    }
    


  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
          <Container className="p-4 border rounded shadow bg-white">
            <h2 className="text-center">Verify OTP</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicOtp">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-grid mt-4">
                <Button variant="primary" type="submit" >Verify</Button>
              </div>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyOTP;
