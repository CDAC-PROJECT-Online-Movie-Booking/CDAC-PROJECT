// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import SearchResult from './SearchResult';
// import { apiUrls, baseUrl } from '../lib/constants';
// import Swal from 'sweetalert2';
// import { Carousel } from 'react-bootstrap';
// export default function Carouselslide() {
//   const [halls, sethalls] = useState([])
//   const [date, setdate] = useState('')
//   const [movieName, setmovieName] = useState('')
//   const [slot, setslot] = useState(0)
//   const [hallId, sethallId] = useState(0)
//   const [data, setData] = useState([])
//   const handleSearch = e => {
//     e.preventDefault()
//     if (hallId || date || movieName || slot) {
//       axios.get(baseUrl + apiUrls.SEARCH_SHOWS + '?hallId=' + hallId + "&date=" + date + "&movieName=" + movieName + "&slot=" + slot).then((resp) => {
//         setData(resp.data)
//       })
//     }
//     else {
//       Swal.fire('Error', 'Please select any one parameter')
//     }
//   }
//   useEffect(() => {
//     axios.get(baseUrl + apiUrls.HALLS_URL)
//       .then(resp => {
//         sethalls(resp.data)
//       }).catch(err => {
//         console.log(err)
//       })
//     axios.get(baseUrl + apiUrls.TODAYS_SHOWS).then((resp) => {
//       setData(resp.data)
//     })
//   }, [])
//   return (
//     <>
//       {/* <div className='mt-5'>
//         <div className="d-block w-100"
//           style={{ height: "500px", backgroundImage: "url('header.jpg')", backgroundSize: "100% 100%" }}>
//           movie_search_code
//         </div>
//       </div> */}

// <div className='mt-5'>
//       <Carousel>
//         <Carousel.Item>
//           <img
//             className="d-block w-100"
//             src="header2.jpg"  // Replace with your image
//             alt="First slide"
//             style={{ height: "500px", objectFit: "fill" }}
//           />
//         </Carousel.Item>

//         <Carousel.Item>
//           <img
//             className="d-block w-100"
//             src="header3.jpg"  // Replace with your image
//             alt="Second slide"
//             style={{ height: "500px", objectFit: "fill" }}
//           />
//         </Carousel.Item>

//         <Carousel.Item>
//           <img
//             className="d-block w-100"
//             src="header1.jpg"  // Replace with your image
//             alt="Second slide"
//             style={{ height: "500px", objectFit: "fill" }}
//           />
//         </Carousel.Item>

//         <Carousel.Item>
//           <img
//             className="d-block w-100"
//             src="header4.jpg"  // Replace with your image
//             alt="Third slide"
//             style={{ height: "500px", objectFit: "fill" }}
//           />
//         </Carousel.Item>
//       </Carousel>
//     </div>
//       <SearchResult data={data} />
//     </>
//   );
// }

import { useEffect, useState } from 'react';
import API from '../lib/constants'; // Importing the configured API instance
import SearchResult from './SearchResult';
import { apiUrls } from '../lib/constants'; // Importing API URLs
import Swal from 'sweetalert2';
import { Carousel } from 'react-bootstrap';

export default function Carouselslide() {
  const [halls, setHalls] = useState([]);
  const [date, setDate] = useState('');
  const [movieName, setMovieName] = useState('');
  const [slot, setSlot] = useState(0);
  const [hallId, setHallId] = useState(0);
  const [data, setData] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (hallId || date || movieName || slot) {
      try {
        const response = await API.get(`${apiUrls.SEARCH_SHOWS}`, {
          params: { hallId, date, movieName, slot }
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      Swal.fire('Error', 'Please select at least one parameter');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hallsResponse = await API.get(apiUrls.HALLS_URL);
        setHalls(hallsResponse.data);

        const showsResponse = await API.get(apiUrls.TODAYS_SHOWS);
        setData(showsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='mt-5'>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="header2.jpg"  
              alt="First slide"
              style={{ height: "500px", objectFit: "fill" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="header3.jpg"  
              alt="Second slide"
              style={{ height: "500px", objectFit: "fill" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="header1.jpg"  
              alt="Third slide"
              style={{ height: "500px", objectFit: "fill" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="header4.jpg"  
              alt="Fourth slide"
              style={{ height: "500px", objectFit: "fill" }}
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <SearchResult data={data} />
    </>
  );
}
