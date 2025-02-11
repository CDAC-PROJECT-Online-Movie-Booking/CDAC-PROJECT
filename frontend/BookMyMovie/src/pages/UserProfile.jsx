 
import { useEffect, useState } from "react";
import API, { apiUrls } from "../lib/constants"; // Ensure correct path


export default function UserProfile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(apiUrls.USERS_LIST + sessionStorage.getItem("id"))
      .then((resp) => setData(resp.data))
      .catch((error) => console.error("Error fetching user profile:", error));
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div
          className="card shadow-lg p-4 rounded"
          style={{ maxWidth: "500px", margin: "auto" }}
        >
          <h4 className="text-center text-primary mb-4">User Profile</h4>

          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <tbody>
                <tr>
                  <th className="bg-light">Full Name</th>
                  <td>{data?.userName || "N/A"}</td>
                </tr>
                <tr>
                  <th className="bg-light">User Name</th>
                  <td>{data?.email || "N/A"}</td>
                </tr>
                <tr>
                  <th className="bg-light">Phone No</th>
                  <td>{data?.mobile || "N/A"}</td>
                </tr>
                <tr>
                  <th className="bg-light">Email ID</th>
                  <td>{data?.email || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
