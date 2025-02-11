// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import Swal from 'sweetalert2'
// import { API, baseUrl } from '../lib/constants'

// export default function Bookings() {
//   const [data, setData] = useState([])
//   const handleCancel = (id) => {
//     axios.delete(API+apiUrls.BOOKINGS_URL + id).then((resp) => {
//       Swal.fire({ title: resp.data })
//       loadData()
//     })
//   }
//   const loadData = () => {
//     axios.get(API+apiUrls.BOOKINGS_URL).then((resp) => {
//       setData(resp.data)
//     })
//   }
//   useEffect(() => {
//     loadData()
//   }, [])
//   return (
//     <>
//       <div className='container mt-5'>
//         <h5 className='p-2'>All Bookings</h5>
//         <table className='table table-bordered'>
//           <thead>
//             <th>Id</th>
//             <th>Booking Date</th>
//             <th>Movie Name</th>
//             <th>User Name</th>
//             <th>No of Seats</th>
//             <th>Show Date</th>
//             <th>Status</th>
//             <th>Action</th>
//           </thead>
//           <tbody>
//             {data.map((x) => (
//               <tr key={x?.bookingId}>
//                 <td>{x?.bookingId}</td>
//                 <td>{x?.bookDate}</td>
//                 <td>{x?.show?.movie?.movieName}</td>
//                 <td>{x?.user?.userName}</td>
//                 <td>{x?.noOfSeats}</td>
//                 <td>{x?.showDate}</td>
//                 <td>{x?.status}</td>
//                 <td>
//                   {x.status === 'Booked' ? (
//                     <button
//                       onClick={(e) => handleCancel(x.bookingId)}
//                       className='btn btn-danger btn-sm'
//                     >
//                       Cancel Booking
//                     </button>
//                   ) : null}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   )
// }

import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import API, { apiUrls } from '../lib/constants';  


export default function Bookings() {
  const [data, setData] = useState([])

  const handleCancel = async (id) => {
    try {
      const response = await API.delete(`${apiUrls.BOOKINGS_URL}${id}`)
      Swal.fire({ title: response.data, icon: 'success' })
      loadData() // Reload bookings after cancellation
    } catch (error) {
      Swal.fire({ title: 'Error', text: error.response?.data || 'Something went wrong!', icon: 'error' })
    }
  }

  const loadData = async () => {
    try {
      const response = await API.get(apiUrls.BOOKINGS_URL)
      setData(response.data)
    } catch (error) {
      Swal.fire({ title: 'Error', text: 'Failed to load bookings', icon: 'error' })
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='container mt-5'>
      <h5 className='p-2'>All Bookings</h5>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Booking Date</th>
            <th>Movie Name</th>
            <th>User Name</th>
            <th>No of Seats</th>
            <th>Show Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((x) => (
              <tr key={x?.bookingId}>
                <td>{x?.bookingId}</td>
                <td>{x?.bookDate}</td>
                <td>{x?.show?.movie?.movieName}</td>
                <td>{x?.user?.userName}</td>
                <td>{x?.noOfSeats}</td>
                <td>{x?.showDate}</td>
                <td>{x?.status}</td>
                <td>
                  {x.status === 'Booked' && (
                    <button
                      onClick={() => handleCancel(x.bookingId)}
                      className='btn btn-danger btn-sm'
                    >
                      Cancel Booking
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

