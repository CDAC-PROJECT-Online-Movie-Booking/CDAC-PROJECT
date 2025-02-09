import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import Home from "./pages/public/Home";
import MovieDetails from "./pages/public/MovieDetails";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import Profile from "./pages/user/Profile";
import Bookings from "./pages/user/Bookings";
import BookingDetails from "./pages/user/BookingDetails";
import Dashboard from "./pages/admin/Dashboard";
import ManageMovies from "./pages/admin/ManageMovies";
import ManageTheaters from "./pages/admin/ManageTheaters";
import Reports from "./pages/admin/Reports";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import VerifyOTP from "./pages/public/VerifyOTP";
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {

    const user = useAuth();
  
  return (
    <AuthProvider>
    <BrowserRouter>
    

    
      <Header  />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Home />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyOTP/>}></Route>

        {/* User Routes */}
        <Route element={<PrivateRoute allowedRoles={["USER"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/:id" element={<BookingDetails />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/movies" element={<ManageMovies />} />
          <Route path="/admin/theaters" element={<ManageTheaters />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>
      </Routes>
      <Footer />
      
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
