import { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel as BTCarousel } from 'react-bootstrap';
import { Toast } from 'react-bootstrap';
import UserMovieList from '../userMovieList/UserMovieList';


const MyCarousel = () => {

    const[screen , setScreen] = useState([])
    const[date , setDate] = useState('')
    const [movieName , setMovieName] = useState('')
    const [slot, setslot] = useState(0)
    const [screenId, setScreenId] = useState(0)
    const [data , setData] = useState([])


    useEffect( () => {
        axios.get("http://localhost:8080/api/screens")
        .then(response => {setScreen(response.data)})
        .catch(err => {
            console.log(err)
        })

        axios.get("http://localhost:8080/api/shows/todays")
        .then((response) => {
            setData(response.data)
        })
    } , [] )

    return(
      <>
      
        <div className='mt-5'>
      <BTCarousel>
        <BTCarousel.Item>
          <img
            className="d-block w-100"
            src="header2.jpg"  // Replace with your image
            alt="First slide"
            style={{ height: "500px", objectFit: "fill" }}
          />
        </BTCarousel.Item>

        <BTCarousel.Item>
          <img
            className="d-block w-100"
            src="header3.jpg"  // Replace with your image
            alt="Second slide"
            style={{ height: "500px", objectFit: "fill" }}
          />
        </BTCarousel.Item>

        <BTCarousel.Item>
          <img
            className="d-block w-100"
            src="header1.jpg"  // Replace with your image
            alt="Second slide"
            style={{ height: "500px", objectFit: "fill" }}
          />
        </BTCarousel.Item>

        <BTCarousel.Item>
          <img
            className="d-block w-100"
            src="header4.jpg"  // Replace with your image
            alt="Third slide"
            style={{ height: "500px", objectFit: "fill" }}
          />
        </BTCarousel.Item>
      </BTCarousel>
    </div>
    <UserMovieList data = {data}/>
    </>
    
    )

}

export default MyCarousel