import React, { useState } from "react";
import Card from "./Card";

function Postal() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pincode.length !== 6) {
      setError("Postal code should be 6 digits.");
      return;
    }
    setLoading(true);
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((response) => response.json())
      .then((data) => {
        if (data[0].Status === "Error") {
          setError(data[0].Message);
          setLoading(false);
        } else {
          setData(data[0]);
          setLoading(false);
          setError(null);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="Postal">
      <h2>Enter Pincode</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" autoFocus />
        </label>
        <p>{error}</p>
        <br />
        <button type="submit">Lookup</button>
      </form>
      {
        data ? 
        <>
        <h3>Pincode : {data.PostOffice[0].Pincode}</h3>
        <h3>Message : {data.Message}</h3> 
        <div className="text-center">
          <input type="text" className="" id="a" placeholder="Filter..."  />{" "}
        </div>
        </>
        : null
      }
      { 
        data? data.PostOffice.map((value,i)=>{
        return <Card {...value} key={i} />
      }) : null }
    </div>
  );
}

export default Postal;
