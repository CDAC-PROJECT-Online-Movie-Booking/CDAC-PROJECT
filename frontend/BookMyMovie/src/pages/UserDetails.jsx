// import axios from "axios"
// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import Swal from "sweetalert2"
// import { apiUrls, baseUrl } from "../lib/constants"

// export default function UserDetails(){
//     const [data,setData]=useState()
//     const {id}=useParams()
//     const loadData=()=>{
//         axios.get(baseUrl+apiUrls.CUSTOMERS_URL+id)
//         .then(resp=>{
//             setData(resp.data)
//         })
//     }
//     const handleActivate = e=>{
//         let status=data?.active?'DeActivate':'Activate'
//         Swal.fire({
//             title: `Do you want to ${status} this user?`,
//             showCancelButton: true,
//             confirmButtonText: status,
//             }).then((result) => {
//             if (result.isConfirmed) {
//                 updateStatus()                
//             } 
//             })
//     }
//     const updateStatus=()=>{
//         axios.put(baseUrl+apiUrls.CUSTOMERS_URL+id)
//         .then(resp=>{
//             loadData()
//             Swal.fire({
//                 title: resp.data
//             })            
//         })
//     }
//     useEffect(()=>{
//         loadData()
//     },[])
//     return(        
//         <>
//             <div className="container mt-5">
//             {data?.active ? (
//                 <button className="btn btn-danger float-end" onClick={handleActivate}>DeActivate</button>
//             ):(
//                 <button className="btn btn-primary float-end" onClick={handleActivate}>Activate</button>
//             )}
//             <h4>Details of User {data?.name}</h4>
//             <table className="table table-bordered mt-4">
//                 <thead>
//                     <tr>
//                         <th>User name</th>
//                         <th>{data?.name}</th>
//                     </tr>
//                     <tr>
//                         <th>Phone no</th>
//                         <th>{data?.phone}</th>
//                     </tr>
//                     <tr>
//                         <th>Email Id</th>
//                         <th>{data?.userid}</th>                        
//                     </tr>
//                     <tr>
//                         <th>Owner Status</th>
//                         <th>{data?.active ? 'Active':'Inactive'}</th>
//                     </tr>
//                 </thead>
//             </table>
//             </div>
//         </>
//     )
// }


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../lib/constants"; // Importing API instead of baseUrl
import { apiUrls } from "../lib/constants";

export default function UserDetails() {
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        API.get(apiUrls.CUSTOMERS_URL + id)
            .then((resp) => setData(resp.data))
            .catch((error) => console.error("Error fetching user details:", error));
    };

    const handleActivate = () => {
        let status = data?.active ? "Deactivate" : "Activate";
        Swal.fire({
            title: `Do you want to ${status} this user?`,
            showCancelButton: true,
            confirmButtonText: status,
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus();
            }
        });
    };

    const updateStatus = () => {
        API.put(apiUrls.CUSTOMERS_URL + id)
            .then((resp) => {
                loadData();
                Swal.fire({
                    title: resp.data,
                });
            })
            .catch((error) => console.error("Error updating user status:", error));
    };

    return (
        <div className="container mt-5">
            {data?.active ? (
                <button className="btn btn-danger float-end" onClick={handleActivate}>Deactivate</button>
            ) : (
                <button className="btn btn-primary float-end" onClick={handleActivate}>Activate</button>
            )}
            <h4>Details of User {data?.name}</h4>
            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>{data?.name}</th>
                    </tr>
                    <tr>
                        <th>Phone No</th>
                        <th>{data?.phone}</th>
                    </tr>
                    <tr>
                        <th>Email ID</th>
                        <th>{data?.userid}</th>
                    </tr>
                    <tr>
                        <th>Owner Status</th>
                        <th>{data?.active ? "Active" : "Inactive"}</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}
