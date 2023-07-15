import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
const DisplayAll = (props) => {
  const [allCrimes, setAllCrimes] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/crime")
      .then((response) => {
        console.log(response.data);
        setAllCrimes(response.data);
      })
      /*.get("http://localhost:8000/api/login")
      .then((response) => {
        console.log(response.data);
        setAllUsers(response.data);
      })*/
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleDeleteCrime = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/crime/${idFromBelow}`)
      .then((response) => {
        console.log("success deleting crime");
        console.log(response);
        const filteredCrimes = allCrimes.filter((crime) => {
          return crime._id !== idFromBelow;
        });
        setAllCrimes(filteredCrimes);
      })
      .catch((err) => {
        console.log("error deleting crime", err.response);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <Link to="/new">Report a Crime</Link>

          <table className="table">
            <thead>
              <tr>
              <th scope="col"><h3>Type of Crime</h3></th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
              <th scope="col">Uploaded By</th>
              </tr>
            </thead>
            <tbody>
              {allCrimes.map((crime, index) => {
                return (
                  <tr key={crime._id}>
                    <td><h3>{crime.title}</h3></td>
                    <td>{crime.status}</td>
                    <td>
                      <Link to={`/edit/${crime._id}`}>
                        <button className="btn btn-primary">Edit</button>
                      </Link>

                      <button
                        onClick={() => handleDeleteCrime(crime._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                    <td></td>
                    {/*<td>{login.firstName}</td>*/}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayAll;