import React from 'react';
import './Card.css';

const Card = (props)=>(
  <div className="Card-box">
    <div className="Card-container">
      {props.children}
    </div>
  </div>
);

export default Card