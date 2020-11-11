import React from 'react';
import './Card.css';

export const Card = ({ title, children }) => {
  return (
    <div className="card-container">
      <div className="title">{title}</div>
      {children}
    </div>
  )
}