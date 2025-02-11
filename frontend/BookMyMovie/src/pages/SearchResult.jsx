// import { format, parse } from 'date-fns'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { baseUrl } from '../lib/constants'
// import { Card, Button, Row, Col } from 'react-bootstrap';

// export default function SearchResult(props) {
//   const data = props.data
//   const state = useSelector((state) => state)
//   console.log('LoggedIn ', state.loggedin.IsLoggedIn)
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
//   const isuser =
//     state.loggedin.IsLoggedIn && sessionStorage.getItem('role') === 'User'
//       ? true
//       : false
//   return (
    // <div className='mx-auto my-2 bg-white' style={{ width: '95%' }}>
    //   <h5 className='p-2 text-center'>Movies List</h5>
    //   {data.length > 0 ? (
    //     <table className='table table-bordered table-responsive'>
    //       <thead>
    //         <tr>
    //           <th>Movie Name</th>
    //           <th>Slot</th>
    //           <th>Hall Details</th>
    //           <th>Date</th>
    //           <th>Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data?.map((x) => (
    //           <tr key={x?.showId}>
    //             <td>
    //               <img
    //                 style={{
    //                   width: '80px',
    //                   height: '100px',
    //                   marginRight: '10px',
    //                 }}
    //                 src={baseUrl + x?.movie.poster}
    //               />
    //               {x?.movie.movieName}
    //             </td>
    //             <td>{findslot(x?.slot)}</td>
    //             <td>{x?.hall.hallDesc}</td>
    //             <td>
    //               {format(
    //                 parse(x?.fromDate, 'yyyy-MM-dd', new Date()),
    //                 'dd-MMM-yyyy'
    //               )}
    //               -
    //               {format(
    //                 parse(x?.toDate, 'yyyy-MM-dd', new Date()),
    //                 'dd-MMM-yyyy'
    //               )}
    //             </td>
    //             <td>
    //               {isuser && (
    //                 <Link
    //                   to={'book/' + x?.showId}
    //                   className='btn btn-danger btn-sm'
    //                 >
    //                   Book Now
    //                 </Link>
    //               )}
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : (
    //     <h5 className='text-center p-2'>No movies found</h5>
    //   )}
    // </div>

//     <div className='mx-auto my-2 bg-white' style={{ width: '70%' }}>
//       <h5 className='p-2 text-center'>Movies List</h5>
//       {data.length > 0 ? (
//         <Row>
//           {data?.map((x) => (
//             <Col key={x?.showId} md={4} className='mb-3'>
//               <Card className='h-100 shadow'>
//                 <Card.Img
//                   variant='top'
//                   src={baseUrl + x?.movie.poster}
//                   style={{ height: '450px', objectFit: 'fill' }}
//                 />
//                 <Card.Body>
//                   <Card.Title>{x?.movie.movieName}</Card.Title>
//                   <Card.Text>
//                     <strong>Slot:</strong> {findslot(x?.slot)} <br />
//                     <strong>Hall:</strong> {x?.hall.hallDesc} <br />
//                     <strong>Date:</strong>{' '}
//                     {format(parse(x?.fromDate, 'yyyy-MM-dd', new Date()), 'dd-MMM-yyyy')} -
//                     {format(parse(x?.toDate, 'yyyy-MM-dd', new Date()), 'dd-MMM-yyyy')}
//                   </Card.Text>
//                 </Card.Body>
//                 {isuser && (
//                   <Card.Footer className='text-center'>
//                     <Link to={'book/' + x?.showId}>
//                       <Button variant='danger' size='sm'>Book Now</Button>
//                     </Link>
//                   </Card.Footer>
//                 )}
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         <h5 className='text-center p-2'>No movies found</h5>
//       )}
//     </div>
//   )
// }
