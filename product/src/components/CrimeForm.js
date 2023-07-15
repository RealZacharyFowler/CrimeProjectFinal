import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CrimeForm = (props) => {
  const [crimeTitle, setCrimeTitle] = useState("");
  const [crimeStatus, setCrimeStatus] = useState("");
  const [crimeCity, setCrimeCity] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/crime", { 
        title: crimeTitle, 
        city: crimeCity,
        status: crimeStatus
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <h1>Add Crime</h1>
        <div className="col-4">
          <Link style={{margin: '20px'}} to="/">Home</Link>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{margin: '20px'}}>
              <label htmlFor="crimeTitle">Crime Type</label>
              <input 
                style={{margin: '20px'}}
                type="text"
                className="form-control"
                onChange={(e) => setCrimeTitle(e.target.value)}
                value={crimeTitle}
              />
              {errors?.title && <span>{errors.title.message}</span> }
            </div>
            <div className = "form-group"  style={{margin: '20px'}}>
            <label htmlFor="crimeStatus">Status</label>
            <select style={{margin: '20px'}}>
              <option value="actual value 1">In progress</option>
              <option value="actual value 2">Resolved</option>
              onChange={(e) => setCrimeStatus(e.target.value)}
              value={crimeStatus}
            </select>
            <div className="form-group" style={{margin: '20px'}}>
              <label htmlFor="crimeTitle">City</label>
              <input 
                style={{margin: '20px'}}
                type="text"
                className="form-control"
                onChange={(e) => setCrimeCity(e.target.value)}
                value={crimeCity}
              />
              {errors?.city && <span>{errors.city.message}</span> }
            </div>
              
            </div>
            <button style={{margin: '20px'}} className="btn btn-primary" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrimeForm;