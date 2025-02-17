import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../auth/authcontext';

const Navbar = () => {
    const {setIsLogin,role,isLogin,setRole} = useAuth();

    const navigate = useNavigate();

    const onLogout = (e) => 
    {
        sessionStorage.clear();
        setIsLogin(false);
        setRole('');
        navigate("/login")
    }


    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-gradient text-black fw-bold opacity-40 border-bottom border-white" style={{ background: 'black' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">BookMyMovie</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {isLogin && role === "Admin" && (
                                <>
                                    <li className="nav-item"><Link className="nav-link active" to="/users">Users</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/movies">Movies</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/screens">Screens</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/shows">Shows</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/bookings">Bookings</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/reports">Report</Link></li>
                                </>
                            )}
                            {isLogin && role === "User" && (
                                <li className="nav-item"><Link className="nav-link active" to="/mybookings">Bookings</Link></li>
                            )}
                        </ul>
                        <ul className="navbar-nav ms-auto">  {/* Moved login/logout options to the right */}
                            {!isLogin ? (
                                <>
                                    <li className="nav-item"><Link className="nav-link active" to="/login">Login</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/register">Register</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item"><Link to="/profile" className="nav-link active">Welcome {sessionStorage["userName"]}</Link></li>
                                    <li className="nav-item"><Link to="/login" className="nav-link active" onClick={onLogout}>Logout</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
    
}


export default Navbar;