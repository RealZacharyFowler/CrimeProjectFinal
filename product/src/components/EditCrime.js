import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EditCrime = (props) => {
  const { id } = useParams();
  const [crimeTitle, setCrimeTitle] = useState("");
  const [crimeBody, setCrimeBody] = useState("");
  const [errors, setErrors] = useState({});
  const [crimeNotFoundError, setCrimeNotFoundError] = useState("");
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/crime/${id}`)
      .then((response) => {
        console.log(response.data);
        setCrimeTitle(response.data.crimeTitle);
        setCrimeBody(response.data.crimeBody);
      })
      .catch((err) => {
        console.log(err.response);
        setCrimeNotFoundError(`Crime not found using that ID`);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/crime/${id}`, { title: crimeTitle }, { body: crimeBody })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };
  return (
    <form onSubmit={submitHandler}>
      {crimeNotFoundError ? (
        <h2>
          {crimeNotFoundError} <Link to="/new">Click here to add Crime</Link>
        </h2>
      ) : null}
      <Link to="/">Home</Link>
      <div className="form-group">
        <label htmlFor="crimeTitle">Crime Title</label>
        <input
          type="text"
          id="crimeTitle"
          value={crimeTitle}
          onChange={(e) => setCrimeTitle(e.target.value)}
        />
        <div className = "form-group"  style={{margin: '100px'}}>
        <label htmlFor="crimeBody">Description</label>
        <textarea  
          id="crimeBody" 
          value={crimeBody} 
          onChange={(e) => setCrimeBody(e.target.value)}>
        </textarea>
        </div>
        
        
        {errors.crime ? <p>{errors.crime.message}</p> : null}
      </div>
      <button type="submit" className="btn btn-primary">
        SUBMIT
      </button>
    </form>
  );
};

export default EditCrime;