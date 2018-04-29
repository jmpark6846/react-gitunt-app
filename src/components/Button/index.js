import React from 'react';
import './index.css';

const Button = ({onClick, children})=>
  <button 
    className="btn btn-primary load-btn" 
    onClick={onClick}>
    {children}
  </button>

const ButtonWithLoading = ({isLoading, onClick, children})=>{ 
  return (
    !isLoading ?                    
    <Button onClick={onClick}>{children}</Button>
    :
    <span>Loading...</span>
  )}

export { ButtonWithLoading };
export default Button;
