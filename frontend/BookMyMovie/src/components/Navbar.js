// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar(){
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
    
//     const logout = e => {
//         dispatch({ type: 'LogOut' });
//         sessionStorage.clear();
//         navigate("/");
//     };
    
//     const state = useSelector(state => state);
//     console.log("LoggedIn ", state.loggedin.IsLoggedIn);
    
//     const isadmin = state.loggedin.IsLoggedIn && sessionStorage.getItem("role") === "Admin";
//     const isuser = state.loggedin.IsLoggedIn && sessionStorage.getItem("role") === "User";
    
//     return (
//         <div>
//             <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-gradient text-black fw-bold opacity-40 border-bottom border-white" style={{ background: 'black' }}>
//                 <div className="container-fluid">
//                     <Link className="navbar-brand" to="#">BookMyMovie</Link>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarNav">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//                             </li>
//                             {isadmin && (
//                                 <>
//                                     <li className="nav-item"><Link className="nav-link active" to="/users">Users</Link></li>
//                                     <li className="nav-item"><Link className="nav-link active" to="/movies">Movies</Link></li>
//                                     <li className="nav-item"><Link className="nav-link active" to="/halls">Halls</Link></li>
//                                     <li className="nav-item"><Link className="nav-link active" to="/shows">Shows</Link></li>
//                                     <li className="nav-item"><Link className="nav-link active" to="/bookings">Bookings</Link></li>
//                                     <li className="nav-item"><Link className="nav-link active" to="/reports">Report</Link></li>
//                                 </>
//                             )}
//                             {isuser && (
//                                 <li className="nav-item"><Link className="nav-link active" to="/mybookings">Bookings</Link></li>
//                             )}
//                         </ul>
//                         <ul className="navbar-nav ms-auto">  {/* Moved login/logout options to the right */}
//                             {!state.loggedin.IsLoggedIn ? (
//                                 <>
//                                     <li className="nav-item"><Link className="nav-link active" to="/login">Login</Link></li>
//                                     <li className="nav-item"><Link className="nav-link active" to="/cregister">Register</Link></li>
//                                 </>
//                             ) : (
//                                 <>
//                                     <li className="nav-item"><Link to="/profile" className="nav-link active">Welcome {state.loggedin.Username}</Link></li>
//                                     <li className="nav-item"><Link to="/login" className="nav-link active" onClick={logout}>Logout</Link></li>
//                                 </>
//                             )}
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// }


import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: 'LogOut' });
        sessionStorage.removeItem("token");
        navigate("/");
    };

    const state = useSelector(state => state);
    const token = sessionStorage.getItem("token");

    let isAdmin = false;
    let isUser = false;
    let username = "";

    if (token) {
        try {
            const decoded = jwtDecode(token);
            isAdmin = decoded.role === "ROLE_ADMIN";
            isUser = decoded.role === "ROLE_USER";
          //  username = decoded.username;
        } catch (error) {
            console.error("Invalid token", error);
            sessionStorage.removeItem("token");
        }
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
                            {isAdmin && (
                                <>
                                    <li className="nav-item"><Link className="nav-link active" to="/users">Users</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/movies">Movies</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/halls">Halls</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/shows">Shows</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/bookings">Bookings</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/reports">Report</Link></li>
                                </>
                            )}
                            {isUser && (
                                <li className="nav-item"><Link className="nav-link active" to="/mybookings">Bookings</Link></li>
                            )}
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            {!token ? (
                                <>
                                    <li className="nav-item"><Link className="nav-link active" to="/login">Login</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/cregister">Register</Link></li>
                                </>
                            ) : (
                                <>
                                    {/* <li className="nav-item"><Link to="/profile" className="nav-link active">Welcome {username}</Link></li> */}
                                    <li className="nav-item"><Link to="/login" className="nav-link active" onClick={logout}>Logout</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

