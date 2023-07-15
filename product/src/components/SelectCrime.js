import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
const SelectCity = (props) => {
    const [allCities, setAllCities] = useState([]);
    useEffect(() => {
        axios
        .post("http://localhost:8000/api/city", { 
            city: cityName, 
          })
          .then((response) => {
            console.log(response.data);
            setAllCities(response.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      }, []);

}

return (
  <div className="container">
    {allCities.map((city, index) => {


    })}



  </div>

    
)








export default SelectCity;