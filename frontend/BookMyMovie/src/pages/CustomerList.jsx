// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { apiUrls, baseUrl } from '../lib/constants'

// export default function CustomersList() {
//   const [data, setData] = useState([])
//   useEffect(() => {
//     axios.get(baseUrl+apiUrls.USERS_LIST).then((resp) => {
//       setData(resp.data)
//     })
//   }, [])
//   return (
//     <>
//       <div className='container mt-5'>
//         <h5 className='p-2'>Users List</h5>
//         <table className='table table-bordered'>
//           <thead>
//             <th>Id</th>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Email Id</th>
//             <th>Status</th>
//           </thead>
//           <tbody>
//             {data
//               .filter((x) => !x.admin)
//               .map((x) => (
//                 <tr key={x.userid}>
//                   <td>{x.userid}</td>
//                   <td>{x.userName}</td>
//                   <td>{x?.mobile}</td>
//                   <td>{x.email}</td>
//                   <td>{x.active ? 'Active' : 'Inactive'}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

      
//     </>
//   )
// }


import { useEffect, useState } from 'react'
import API, {apiUrls } from '../lib/constants'

export default function CustomersList() {
  const [data, setData] = useState([])

  useEffect(() => {
    API.get(apiUrls.USERS_LIST)
      .then((resp) => {
        setData(resp.data)
      })
      .catch((error) => console.error('Error fetching users:', error))
  }, [])

  return (
    <div className='container mt-5'>
      <h5 className='p-2'>Users List</h5>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email Id</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((x) => !x.admin)
            .map((x) => (
              <tr key={x.userid}>
                <td>{x.userid}</td>
                <td>{x.userName}</td>
                <td>{x?.mobile}</td>
                <td>{x.email}</td>
                <td>{x.active ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

