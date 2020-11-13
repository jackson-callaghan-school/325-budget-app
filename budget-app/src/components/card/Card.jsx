import React, { useState } from 'react';
import './Card.css';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

export const Card = ({ title, children, onSubmit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleState, setTitleState] = useState(title);

  return (
    <div className="card-container">
      {title && <div className='card-header'>
        {!isEditing && <div className='card-title'>{titleState}</div>}
        {isEditing && <input value={titleState} onChange={(e) => { setTitleState(e.currentTarget.value) }} autoFocus/>}
        {!isEditing && <EditIcon className='icon-right' onClick={() => { setIsEditing(!isEditing) }} />}
        {isEditing && <CheckIcon className='icon-right' onClick={() => {
          onSubmit(titleState);
          setIsEditing(!isEditing);
        }} />}
        {isEditing && <DeleteIcon className='icon-left' onClick={onDelete}/>}
      </div>}
      <div className='card-body'>
        {children}
      </div>
    </div>
  )
}