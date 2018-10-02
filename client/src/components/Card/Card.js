import React from 'react';
import './Card.css';

const Card = (props)=>(
  <div className="Card-box">
    <div className="Card-container">
      <h4>{props.title}</h4>
      <p>{props.price}</p>
    </div>
  </div>
);

export default Card