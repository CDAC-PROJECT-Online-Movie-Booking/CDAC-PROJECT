// import axios from 'axios'
// import { format } from 'date-fns'
// import { useEffect, useState } from 'react'
// import swal from 'sweetalert2'
// import { apiUrls, baseUrl } from '../lib/constants'

// export default function Shows() {
//   const [data, setData] = useState([])
//   const [fromdate, setfromdate] = useState()
//   const [todate, settodate] = useState()
//   const [slot, setslot] = useState()
//   const [price,setprice]=useState()
//   const [hallid, sethallid] = useState()
//   const [movieid, setmovieid] = useState()
//   const [movies, setmovies] = useState([])
//   const [halls, sethalls] = useState([])

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (fromdate == undefined) {
//       swal.fire({
//         title: 'Error',
//         icon: 'error',
//         text: 'Please fill all details',
//       })
//       return
//     }
//     axios
//       .post(baseUrl+apiUrls.SHOWS_URL, {
//         fromDate: fromdate,
//         hallId: hallid,
//         movieId: movieid,
//         toDate: todate,
//         slot,
//         price
//       })
//       .then((resp) => {
//         console.log(resp)
//         swal.fire({
//           title: 'Success',
//           text: resp.data,
//         })
//         setfromdate('')
//         setslot('')
//         settodate('')
//         sethallid('')
//         setmovieid('')
//         setprice('')
//         loadData()
//       })
//       .catch((err) => {
//         swal.fire({
//           title: 'error',
//           icon: 'error',
//           text: 'Cannot save Show',
//         })
//       })
//   }
//   const findslot = (id) => {
//     switch (id) {
//       case 1:
//         return '09:00AM to 12:00PM'
//       case 2:
//         return '12:00PM to 03:00PM'
//       case 3:
//         return '03:00PM to 06:00PM'
//       case 4:
//         return '06:00PM to 09:00PM'
//       case 5:
//         return '09:00PM to 12:00PM'
//     }
//   }
//   const handleDelete = (id) => {
//     axios
//       .delete('http://localhost:8080/api/shows/' + id)
//       .then((resp) => {
//         swal.fire({
//           icon: 'error',
//           title: 'Deleted',
//           text: resp.data,
//         })
//         loadData()
//       })
//       .catch((err) => {
//         swal.fire({
//           title: 'Error',
//           icon: 'error',
//           text: 'Cannot delete Hall',
//         })
//       })
//   }
//   const loadData = () => {
//     axios.get(baseUrl+apiUrls.SHOWS_URL).then((resp) => {
//       setData(resp.data)
//     })    
//   }
//   useEffect(() => {
//     axios.get(baseUrl+apiUrls.MOVIES_URL).then((resp) => {
//       setmovies(resp.data)
//     })
//     axios.get(baseUrl+apiUrls.HALLS_URL).then((resp) => {
//       sethalls(resp.data)
//     })
//     loadData()
//   }, [])
//   return (
//     <>
//       <div className='container mt-5'>
//         <div className='row'>
//           <div className='col-sm-8'>
//             <h5 className='p-2'>Shows List</h5>
//             <table className='table table-bordered'>
//               <thead>
//                 <th>Id</th>
//                 <th>Movie Name</th>
//                 <th>Hall Details</th>
//                 <th>Show Details</th>
//                 <th>Ticket</th>
//                 <th>Date</th>
//                 <th>Action</th>
//               </thead>
//               <tbody>
//                 {data?.map((x) => (
//                   <tr key={x?.showId}>
//                     <td>{x?.showId}</td>
//                     <td>{x?.movie.movieName}</td>
//                     <td>{x?.hall.hallDesc}</td>
//                     <td>{findslot(x?.slot)}</td>
//                     <td>{x?.price}</td>
//                     <td>
//                       {x?.fromDate} - {x?.toDate}
//                     </td>
//                     <td>
//                       <button
//                         onClick={(e) => handleDelete(x.showId)}
//                         className='btn btn-danger btn-sm'
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className='col-sm-4'>
//             <h5>Add Show</h5>
//             <form>
//               <div className='mb-2'>
//                 <label>Movie</label>
//                 <select
//                   className='form-control form-control-sm'
//                   value={movieid}
//                   onChange={(e) => setmovieid(e.target.value)}
//                 >
//                   <option value=''>Select Movie</option>
//                   {movies.map((x) => (
//                     <option value={x.movieId}>{x.movieName}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className='mb-2'>
//                 <label>Hall</label>
//                 <select
//                   className='form-control form-control-sm'
//                   value={hallid}
//                   onChange={(e) => sethallid(e.target.value)}
//                 >
//                   <option value=''>Select Hall</option>
//                   {halls.map((x) => (
//                     <option value={x.hallId}>{x.hallDesc}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className='mb-2'>
//                 <label>Ticket Price</label>
//                 <input type='number'
//                   value={price}
//                   placeholder='Ticket Price'
//                   onChange={(e) => setprice(e.target.value)}
//                   className='form-control form-control-sm'
//                 />                  
//               </div>
//               <div className='mb-2'>
//                 <label>Time Slot</label>
//                 <select
//                   value={slot}
//                   onChange={(e) => setslot(e.target.value)}
//                   className='form-control form-control-sm'
//                 >
//                   <option value=''>Select Time Slot</option>
//                   <option value='1'>09:00AM to 12:00PM</option>
//                   <option value='2'>12:00PM to 03:00PM</option>
//                   <option value='3'>03:00AM to 06:00PM</option>
//                   <option value='4'>06:00AM to 09:00PM</option>
//                   <option value='5'>09:00AM to 12:00AM</option>
//                 </select>
//               </div>
//               <div className='mb-2'>
//                 <label>From Date</label>
//                 <input
//                   type='date'
//                   min={format(new Date(), 'yyyy-MM-dd')}
//                   className='form-control form-control-sm'
//                   value={fromdate}
//                   onChange={(e) => setfromdate(e.target.value)}
//                 />
//               </div>
//               <div className='mb-2'>
//                 <label>To Date</label>
//                 <input
//                   type='date'
//                   min={format(new Date(), 'yyyy-MM-dd')}
//                   className='form-control form-control-sm'
//                   value={todate}
//                   onChange={(e) => settodate(e.target.value)}
//                 />
//               </div>
//               <button
//                 onClick={handleSubmit}
//                 className='btn btn-primary btn-sm float-end'
//               >
//                 Save Details
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

import { format } from "date-fns";
import { useEffect, useState } from "react";
import swal from "sweetalert2";
import API, { apiUrls } from "../lib/constants";

export default function Shows() {
  const [data, setData] = useState([]);
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [slot, setslot] = useState("");
  const [price, setprice] = useState("");
  const [hallid, sethallid] = useState("");
  const [movieid, setmovieid] = useState("");
  const [movies, setmovies] = useState([]);
  const [halls, sethalls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromdate || !todate || !slot || !price || !hallid || !movieid) {
      swal.fire({
        title: "Error",
        icon: "error",
        text: "Please fill all details",
      });
      return;
    }
    try {
      const resp = await API.post(apiUrls.SHOWS_URL, {
        fromDate: fromdate,
        toDate: todate,
        slot,
        price,
        hallId: hallid,
        movieId: movieid,
      });
      swal.fire({
        title: "Success",
        text: resp.data,
      });
      setfromdate("");
      settodate("");
      setslot("");
      setprice("");
      sethallid("");
      setmovieid("");
      loadData();
    } catch (error) {
      swal.fire({
        title: "Error",
        icon: "error",
        text: "Cannot save Show",
      });
    }
  };

  const findslot = (id) => {
    switch (id) {
      case 1:
        return "09:00AM to 12:00PM";
      case 2:
        return "12:00PM to 03:00PM";
      case 3:
        return "03:00PM to 06:00PM";
      case 4:
        return "06:00PM to 09:00PM";
      case 5:
        return "09:00PM to 12:00AM";
      default:
        return "Unknown Slot";
    }
  };

  const handleDelete = async (id) => {
    try {
      const resp = await API.delete(`${apiUrls.SHOWS_URL}/${id}`);
      swal.fire({
        icon: "error",
        title: "Deleted",
        text: resp.data,
      });
      loadData();
    } catch (error) {
      swal.fire({
        title: "Error",
        icon: "error",
        text: "Cannot delete Show",
      });
    }
  };

  const loadData = async () => {
    try {
      const showResp = await API.get(apiUrls.SHOWS_URL);
      setData(showResp.data);

      const movieResp = await API.get(apiUrls.MOVIES_URL);
      setmovies(movieResp.data);

      const hallResp = await API.get(apiUrls.HALLS_URL);
      sethalls(hallResp.data);
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-8">
          <h5 className="p-2">Shows List</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Movie Name</th>
                <th>Hall Details</th>
                <th>Show Details</th>
                <th>Ticket</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((x) => (
                <tr key={x?.showId}>
                  <td>{x?.showId}</td>
                  <td>{x?.movie?.movieName}</td>
                  <td>{x?.hall?.hallDesc}</td>
                  <td>{findslot(x?.slot)}</td>
                  <td>{x?.price}</td>
                  <td>
                    {x?.fromDate} - {x?.toDate}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(x.showId)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-sm-4">
          <h5>Add Show</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label>Movie</label>
              <select
                className="form-control form-control-sm"
                value={movieid}
                onChange={(e) => setmovieid(e.target.value)}
              >
                <option value="">Select Movie</option>
                {movies.map((x) => (
                  <option key={x.movieId} value={x.movieId}>
                    {x.movieName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label>Hall</label>
              <select
                className="form-control form-control-sm"
                value={hallid}
                onChange={(e) => sethallid(e.target.value)}
              >
                <option value="">Select Hall</option>
                {halls.map((x) => (
                  <option key={x.hallId} value={x.hallId}>
                    {x.hallDesc}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label>Ticket Price</label>
              <input
                type="number"
                value={price}
                placeholder="Ticket Price"
                onChange={(e) => setprice(e.target.value)}
                className="form-control form-control-sm"
              />
            </div>
            <div className="mb-2">
              <label>Time Slot</label>
              <select
                value={slot}
                onChange={(e) => setslot(e.target.value)}
                className="form-control form-control-sm"
              >
                <option value="">Select Time Slot</option>
                <option value="1">09:00AM to 12:00PM</option>
                <option value="2">12:00PM to 03:00PM</option>
                <option value="3">03:00PM to 06:00PM</option>
                <option value="4">06:00PM to 09:00PM</option>
                <option value="5">09:00PM to 12:00AM</option>
              </select>
            </div>
            <div className="mb-2">
              <label>From Date</label>
              <input
                type="date"
                min={format(new Date(), "yyyy-MM-dd")}
                className="form-control form-control-sm"
                value={fromdate}
                onChange={(e) => setfromdate(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>To Date</label>
              <input
                type="date"
                min={format(new Date(), "yyyy-MM-dd")}
                className="form-control form-control-sm"
                value={todate}
                onChange={(e) => settodate(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm float-end">
              Save Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

