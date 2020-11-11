import React from 'react';
import './Card.css';

export const Card = ({ title, children }) => {
  return (
    <div className="card-container">
      <div className='card-title'>{title}</div>
      <div className='card-body'>
        {children}
      </div>
    </div>
  )
}