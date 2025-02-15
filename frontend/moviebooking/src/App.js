import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './auth/authcontext';
import { BrowserRouter ,Routes , Route} from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import { toast } from 'react-toastify';
import Navbar from './components/navbar/Navbar';
import MyCarousel from './components/carousel/MyCarousel';
import UserList from './components/userList/UserList';
import AdminMovieList from './components/adminMovieList/adminMovieList';
import Screen from './components/theatreScreen/Screen';
import Shows from './components/shows/Shows';
import UserMovieList from './components/userMovieList/UserMovieList';
import BookNow from './components/bookNow/BookNow';
import MyBookings from './components/myBooking/MyBookings';
import Bookings from './components/bookings/Bookings';
import Reports from './components/report/Reports';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
        <Route>
          <Route path='/' element={<MyCarousel></MyCarousel>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/users' element={<UserList/>}></Route>
          <Route path='/movies' element={<AdminMovieList/>}></Route>
          <Route path='/screens' element={<Screen/>}></Route>
          <Route path='/shows' element={<Shows/>}></Route>
          <Route path='/book/:id' element={<BookNow/>}></Route>
          <Route path='/mybookings' element={<MyBookings/>}></Route>
          <Route path='/bookings' element={<Bookings/>}></Route>
          <Route path='/reports' element={<Reports/>}></Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
