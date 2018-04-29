import React from 'react';
import './index.css';

const Button = ({onClick, children})=>
  <button 
    className="btn btn-default load-btn" 
    onClick={onClick}>
    {children}
  </button>

export default Button;
