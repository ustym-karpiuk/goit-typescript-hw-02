import React from 'react';
import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p className={css.error}>{message}</p>;
};

export default ErrorMessage;
