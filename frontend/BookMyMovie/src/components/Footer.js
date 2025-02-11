import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="Footer stick-bottom  text-center text-white mx-auto" style={{ background: "black",width:"100%" }}>

      <div className="container-fluid p-1"  >

        <a className="btn btn-outline-light btn-floating m-2" href="https://www.facebook.com/login.php" type="button"
        ><i className="fa fa-facebook-f"></i
        ></a>

        <a className="btn btn-outline-light btn-floating m-2" href="https://twitter.com/login/" type="button"
        ><i className="fa fa-twitter"></i
        ></a>

        <a className="btn btn-outline-light btn-floating m-2" href="https://www.google.co.in/" Type="button"
        ><i className="fa fa-google"></i
        ></a>

        <a className="btn btn-outline-light btn-floating m-2" href="https://github.com/CDAC-PROJECT-Online-Movie-Booking/CDAC-PROJECT" type="button"
        ><i className="fa fa-github"></i
        ></a>


      </div>
      <div>
        <h2>Book My Movie</h2>
        <p>Contact No: +9198xxxxxxxx    &ensp; &ensp; &ensp;    Gmail: connect.bookmymovie@gmail.com</p>

      </div>


      <div className="text-center p-1" >
        © 2025 Copyright by Book My Movie Website
        
      </div>
<br />
    </footer>
  );
}
