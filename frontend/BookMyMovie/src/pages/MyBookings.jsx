// import axios from "axios";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { apiUrls, baseUrl } from "../lib/constants";
// import { findslot, formatDate } from "../lib/util";

// export default function MyBookings() {
//   const [data, setData] = useState([]);
//   const handleCancel = (id) => {
//     axios.get(baseUrl + apiUrls.CANCELLED_BOOKING + id).then((resp) => {
//       Swal.fire({ title: resp.data });
//       loadData();
//     });
//   };
//   const loadData = () => {
//     axios
//       .get(baseUrl + apiUrls.USERS_BOOKINGS + sessionStorage.getItem("id"))
//       .then((resp) => {
//         setData(resp.data);
//       });
//   };
//   useEffect(() => {
//     loadData();
//   }, []);
//   return (
//     <>
//       <div className="container mt-5">
//         <div className="card shadow-lg p-4 rounded">
//           <h4 className="text-center text-primary mb-4">Booking History</h4>

//           <div className="table-responsive">
//             <table className="table table-hover table-bordered text-center">
//               <thead className="table-dark">
//                 <tr>
//                   <th>Id</th>
//                   <th>Booking Date</th>
//                   <th>Movie</th>
//                   <th>No of Seats</th>
//                   <th>Cost</th>
//                   <th>Show Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((x) => (
//                   <tr key={x?.bookingId}>
//                     <td>{x?.bookingId}</td>
//                     <td>{formatDate(x?.bookDate)}</td>
//                     <td className="d-flex align-items-center">
//                       <img
//                         className="rounded me-3"
//                         src={baseUrl + x?.show?.movie?.poster}
//                         alt="Movie Poster"
//                         style={{
//                           width: "70px",
//                           height: "100px",
//                           objectFit: "cover",
//                         }}
//                       />
//                       <div>
//                         <strong>{x?.show?.movie?.movieName}</strong> (
//                         {x?.show?.movie?.year}) <br />
//                         {x?.show?.movie?.actor} <br />
//                         {x?.show?.movie?.director}
//                       </div>
//                     </td>
//                     <td>
//                       <strong>{x?.noOfSeats}</strong>
//                     </td>
//                     <td>
//                       <strong>₹{x?.cost}</strong>
//                     </td>
//                     <td>
//                       {formatDate(x?.showDate)} <br />
//                       <span className="badge bg-info">
//                         {findslot(x?.show?.slot)}
//                       </span>
//                     </td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           x?.status === "Confirmed" ? "bg-success" : "bg-danger"
//                         }`}
//                       >
//                         {x?.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API, { apiUrls } from "../lib/constants";
import { findslot, formatDate } from "../lib/util";

export default function MyBookings() {
  const [data, setData] = useState([]);

  const handleCancel = (id) => {
    API.get(apiUrls.CANCELLED_BOOKING + id).then((resp) => {
      Swal.fire({ title: resp.data });
      loadData();
    });
  };

  const loadData = () => {
    API.get(apiUrls.USERS_BOOKINGS + sessionStorage.getItem("id")).then(
      (resp) => {
        setData(resp.data);
      }
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded">
        <h4 className="text-center text-primary mb-4">Booking History</h4>

        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center">
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
                      src={`${API.defaults.baseURL}/${x?.show?.movie?.poster}`}
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
                    <span className="badge bg-info">
                      {findslot(x?.show?.slot)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        x?.status === "Confirmed" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {x?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

