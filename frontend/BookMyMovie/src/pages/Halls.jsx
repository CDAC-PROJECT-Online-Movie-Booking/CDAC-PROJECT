// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import swal from 'sweetalert2'
// import { apiUrls, baseUrl } from '../lib/constants'

// export default function Halls() {
//   const [data, setData] = useState([])
//   const [hallDesc, sethallDesc] = useState()
//   const [capacity, setcapacity] = useState(1)
//   const [showadd, setshowadd] = useState(true)
//   const [showseat, setshowseat] = useState(false)
//   const [hall, sethall] = useState()
//   const [seattypes, setseattypes] = useState([])
//   const [seattypeid, setseattypeid] = useState()
//   const [seatcount, setseatcount] = useState()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (hallDesc == undefined) {
//       swal.fire({
//         title: 'Error',
//         icon: 'error',
//         text: 'Please fill all details',
//       })
//       return
//     }
//     axios
//       .post(baseUrl+apiUrls.HALLS_URL, {
//         hallDesc: hallDesc,
//         capacity: capacity,
//       })
//       .then((resp) => {
//         console.log(resp)
//         swal.fire({
//           title: 'Success',
//           text: resp.data,
//         })
//         sethallDesc('')
//         setcapacity('')
//         loadData()
//       })
//       .catch((err) => {
//         swal.fire({
//           title: 'error',
//           icon: 'error',
//           text: 'Cannot save Hall',
//         })
//       })
//   }
  
//   const handleDelete = (id) => {
//     axios
//       .delete(baseUrl+apiUrls.HALLS_URL + id)
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
//     axios.get(baseUrl+apiUrls.HALLS_URL).then((resp) => {
//       setData(resp.data)
//     })
//   }
//   useEffect(() => {
//     loadData()
//   }, [])
//   return (
//     <>
//       <div className='container mt-5'>
//         <div className='row'>
//           <div className='col-sm-8'>
//             <h5 className='p-2'>Halls List</h5>
//             <table className='table table-bordered'>
//               <thead>
//                 <th>Id</th>
//                 <th>Hall Name</th>
//                 <th>Capacity</th>
//                 <th>Action</th>
//               </thead>
//               <tbody>
//                 {data?.map((x) => (
//                   <tr key={x?.hallId}>
//                     <td>{x?.hallId}</td>
//                     <td>{x?.hallDesc}</td>
//                     <td>{x?.capacity}</td>                    
//                     <td>
//                       <button
//                         onClick={(e) => handleDelete(x.hallId)}
//                         className='btn btn-danger btn-sm me-2'
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
//             {showadd && (
//               <div className='card'>
//                 <div className='card-header text-center'>
//                   <h5>Add Hall</h5>
//                 </div>
//                 <div className='card-body'>
//                   <form>
//                     <div className='mb-2'>
//                       <label>Description</label>
//                       <input
//                         type='text'
//                         className='form-control form-control-sm'
//                         value={hallDesc}
//                         onChange={(e) => sethallDesc(e.target.value)}
//                       />
//                     </div>
//                     <div className='mb-2'>
//                       <label>Capacity</label>
//                       <input
//                         type='number'
//                         min='1'                        
//                         className='form-control form-control-sm'
//                         value={capacity}
//                         onChange={(e) => setcapacity(e.target.value)}
//                       />
//                     </div>
//                     <button
//                       onClick={handleSubmit}
//                       className='btn btn-primary btn-sm float-end'
//                     >
//                       Save Details
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </>
//   )
// }


import { useEffect, useState } from 'react';
import swal from 'sweetalert2';
import API from '../lib/constants';  // Importing API instance
import { apiUrls } from '../lib/constants';

export default function Halls() {
  const [halls, setHalls] = useState([]);
  const [hallDesc, setHallDesc] = useState('');
  const [capacity, setCapacity] = useState(1);

  // Load halls when component mounts
  useEffect(() => {
    loadHalls();
  }, []);

  // Fetch halls data
  const loadHalls = async () => {
    try {
      const response = await API.get(apiUrls.HALLS_URL);
      setHalls(response.data);
    } catch (error) {
      console.error('Error fetching halls:', error);
    }
  };

  // Handle adding a new hall
  const handleAddHall = async (e) => {
    e.preventDefault();

    if (!hallDesc.trim()) {
      return swal.fire({ title: 'Error', icon: 'error', text: 'Please enter a valid hall description' });
    }

    try {
      const response = await API.post(apiUrls.HALLS_URL, {
        hallDesc,
        capacity,
      });

      swal.fire({ title: 'Success', text: response.data, icon: 'success' });
      setHallDesc('');
      setCapacity(1);
      loadHalls(); // Reload data after adding
    } catch (error) {
      swal.fire({ title: 'Error', icon: 'error', text: 'Cannot save Hall' });
    }
  };

  // Handle deleting a hall
  const handleDeleteHall = async (id) => {
    try {
      const response = await API.delete(`${apiUrls.HALLS_URL}${id}`);

      swal.fire({ icon: 'success', title: 'Deleted', text: response.data });
      loadHalls(); // Reload data after deleting
    } catch (error) {
      swal.fire({ title: 'Error', icon: 'error', text: 'Cannot delete Hall' });
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-sm-8'>
          <h5 className='p-2'>Halls List</h5>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Hall Name</th>
                <th>Capacity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {halls?.map((hall) => (
                <tr key={hall?.hallId}>
                  <td>{hall?.hallId}</td>
                  <td>{hall?.hallDesc}</td>
                  <td>{hall?.capacity}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteHall(hall.hallId)}
                      className='btn btn-danger btn-sm me-2'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='col-sm-4'>
          <div className='card'>
            <div className='card-header text-center'>
              <h5>Add Hall</h5>
            </div>
            <div className='card-body'>
              <form>
                <div className='mb-2'>
                  <label>Description</label>
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    value={hallDesc}
                    onChange={(e) => setHallDesc(e.target.value)}
                  />
                </div>
                <div className='mb-2'>
                  <label>Capacity</label>
                  <input
                    type='number'
                    min='1'
                    className='form-control form-control-sm'
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleAddHall}
                  className='btn btn-primary btn-sm float-end'
                >
                  Save Details
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
