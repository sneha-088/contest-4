import React from 'react'
import './Card.css';

function Card({
    Name,
    Description,
    BranchType,
    DeliveryStatus,

}) {
  return (
    <div className="cardData">
     <h1>Card Data Is : </h1>
      <p>Name : {Name}</p>
      <p>Description : {Description}</p>
      <p>BranchType : {BranchType}</p>
      <p>DeliveryStatus: {DeliveryStatus}</p>
    </div>
  )
}

export default Card
