// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import swal from 'sweetalert2'
// import { apiUrls, baseUrl } from '../lib/constants'

// export default function Movies() {
//   const [data, setData] = useState([])
//   const [movieName, setmovieName] = useState()
//   const [actor,setactor]=useState()
//   const [actoress,setactoress]=useState()
//   const [director,setdirector]=useState()
//   const [description,setdescription]=useState()
//   const [year,setyear]=useState()
//   const [movieid,setmovieid]=useState(0)
//   const [selectedPhoto, setSelectedPhoto] = useState(null)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (movieName === undefined || year===undefined || description === undefined ||
//       actor === undefined || actoress === undefined || director === undefined) {
//       swal.fire({
//         title: 'Error',
//         icon: 'error',
//         text: 'Please fill all details',
//       })
//       return
//     }
//     const formData = new FormData()
//     formData.append('photo', selectedPhoto)
//     formData.append('movieName', movieName)
//     formData.append('year', year)
//     formData.append('actor', actor)
//     formData.append('actress', actoress)
//     formData.append('director', director)
//     formData.append('description', description)
//     formData.append('movieId',movieid)
//     axios
//       .post(baseUrl+apiUrls.MOVIES_URL, formData)
//       .then((resp) => {
//         console.log(resp)
//         swal.fire({
//           title: 'Success',
//           text: resp.data,
//         })
//         setmovieName('')
//         setactor('')
//         setactoress('')
//         setdirector('')
//         setyear('')
//         setdescription('')
//         setmovieid(0)
//         setSelectedPhoto(null)
//         loadData()
//       })
//       .catch((err) => {
//         swal.fire({
//           title: 'error',
//           icon: 'error',
//           text: 'Cannot save Movie',
//         })
//       })
//   }

//   const handleEdit = (movie) =>{
//       setmovieName(movie.movieName)
//       setyear(movie.year)
//       setactor(movie.actor)
//       setactoress(movie.actress)
//       setdirector(movie.director)
//       setdescription(movie.description)
//       setmovieid(movie.movieId)
//   }

//   const handleDelete = (id) => {
//     axios
//       .delete(baseUrl+apiUrls.MOVIES_URL + id)
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
//           text: 'Cannot delete flight',
//         })
//       })
//   }
//   const handleFileInput = (e) => {
//     setSelectedPhoto(e.target.files[0])
//   }
//   const loadData = () => {
//     axios.get(baseUrl+apiUrls.MOVIES_URL).then((resp) => {
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
//             <h5 className='p-2'>Movies List</h5>
//             <table className='table table-bordered'>
//               <thead>
//                 <th>Id</th>
//                 <th>Movie Name</th>
//                 <th>Action</th>
//               </thead>
//               <tbody>
//                 {data?.map((x) => (
//                   <tr key={x?.movieId}>
//                     <td>{x?.movieId}</td>
//                     <td>
//                       <img
//                       className='float-start'
//                         src={'http://localhost:8080/' + x?.poster}
//                         style={{
//                           width: '100px',
//                           height: '120px',
//                           marginRight: '10px',
//                         }}
//                       />
//                       {x?.movieName}<br/>
//                       Actors: {x?.actor}<br/>
//                       Actress: {x?.actress}
//                     </td>
//                     <td>
//                       <button
//                         onClick={(e) => handleDelete(x.movieId)}
//                         className='btn btn-danger btn-sm'
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={(e) => handleEdit(x)}
//                         className='btn btn-primary btn-sm ms-2'
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className='col-sm-4'>
//             <h5>Add Movie</h5>
//             <form>
//               <div className='mb-2'>
//                 <label>Movie Name</label>
//                 <input
//                   type='text'
//                   className='form-control form-control-sm'
//                   value={movieName}
//                   onChange={(e) => setmovieName(e.target.value)}
//                 />
//               </div>
//               <div className='mb-2'>
//                 <label>Actors Name</label>
//                 <input
//                   type='text'
//                   className='form-control form-control-sm'
//                   value={actor}
//                   onChange={(e) => setactor(e.target.value)}
//                 />
//               </div>
//               <div className='mb-2'>
//                 <label>Actresses Name</label>
//                 <input
//                   type='text'
//                   className='form-control form-control-sm'
//                   value={actoress}
//                   onChange={(e) => setactoress(e.target.value)}
//                 />
//               </div>
//               <div className='mb-2'>
//                 <label>Director Name</label>
//                 <input
//                   type='text'
//                   className='form-control form-control-sm'
//                   value={director}
//                   onChange={(e) => setdirector(e.target.value)}
//                 />
//               </div>
//               <div className='mb-2'>
//                 <label>Release year</label>
//                 <input
//                   type='number'
//                   className='form-control form-control-sm'
//                   value={year}
//                   onChange={(e) => setyear(e.target.value)}
//                 />
//               </div>
//               <div className='mb-2'>
//                 <label>Description</label>
//                 <textarea
//                   rows={3}
//                   className='form-control form-control-sm'
//                   value={description}
//                   onChange={(e) => setdescription(e.target.value)}
//                 ></textarea>
//               </div>
//               <div className='mb-2'>
//                 <label>Movie Poster</label>
//                 <input
//                   type='file'
//                   onChange={handleFileInput}
//                   className='form-control-file form-control'
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


import { useEffect, useState } from 'react';
import swal from 'sweetalert2';
import API from '../lib/constants';  // Importing API instance
import { apiUrls } from '../lib/constants';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [actor, setActor] = useState('');
  const [actress, setActress] = useState('');
  const [director, setDirector] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [movieId, setMovieId] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Fetch movies data
  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const response = await API.get(apiUrls.MOVIES_URL);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Handle movie form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movieName || !year || !description || !actor || !actress || !director) {
      return swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Please fill all details',
      });
    }

    const formData = new FormData();
    formData.append('photo', selectedPhoto);
    formData.append('movieName', movieName);
    formData.append('year', year);
    formData.append('actor', actor);
    formData.append('actress', actress);
    formData.append('director', director);
    formData.append('description', description);
    formData.append('movieId', movieId);

    try {
      const response = await API.post(apiUrls.MOVIES_URL, formData);
      swal.fire({ title: 'Success', text: response.data, icon: 'success' });

      // Reset form
      setMovieName('');
      setActor('');
      setActress('');
      setDirector('');
      setYear('');
      setDescription('');
      setMovieId(0);
      setSelectedPhoto(null);
      loadMovies(); // Reload data
    } catch (error) {
      swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Cannot save Movie',
      });
    }
  };

  // Handle edit action
  const handleEdit = (movie) => {
    setMovieName(movie.movieName);
    setYear(movie.year);
    setActor(movie.actor);
    setActress(movie.actress);
    setDirector(movie.director);
    setDescription(movie.description);
    setMovieId(movie.movieId);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`${apiUrls.MOVIES_URL}${id}`);
      swal.fire({ icon: 'success', title: 'Deleted', text: response.data });
      loadMovies(); // Reload data
    } catch (error) {
      swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Cannot delete Movie',
      });
    }
  };

  const handleFileInput = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        {/* Movies List */}
        <div className='col-sm-8'>
          <h5 className='p-2'>Movies List</h5>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Movie Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {movies?.map((movie) => (
                <tr key={movie?.movieId}>
                  <td>{movie?.movieId}</td>
                  <td>
                    <img
                      className='float-start'
                      src={`http://localhost:8080/${movie?.poster}`}
                      style={{
                        width: '100px',
                        height: '120px',
                        marginRight: '10px',
                      }}
                      alt="Movie Poster"
                    />
                    {movie?.movieName}<br />
                    Actors: {movie?.actor}<br />
                    Actress: {movie?.actress}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(movie.movieId)}
                      className='btn btn-danger btn-sm'
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(movie)}
                      className='btn btn-primary btn-sm ms-2'
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Movie Form */}
        <div className='col-sm-4'>
          <h5>Add Movie</h5>
          <form>
            <div className='mb-2'>
              <label>Movie Name</label>
              <input
                type='text'
                className='form-control form-control-sm'
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <label>Actors Name</label>
              <input
                type='text'
                className='form-control form-control-sm'
                value={actor}
                onChange={(e) => setActor(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <label>Actresses Name</label>
              <input
                type='text'
                className='form-control form-control-sm'
                value={actress}
                onChange={(e) => setActress(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <label>Director Name</label>
              <input
                type='text'
                className='form-control form-control-sm'
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <label>Release Year</label>
              <input
                type='number'
                className='form-control form-control-sm'
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <label>Description</label>
              <textarea
                rows={3}
                className='form-control form-control-sm'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className='mb-2'>
              <label>Movie Poster</label>
              <input
                type='file'
                onChange={handleFileInput}
                className='form-control-file form-control'
              />
            </div>
            <button
              onClick={handleSubmit}
              className='btn btn-primary btn-sm float-end'
            >
              Save Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
