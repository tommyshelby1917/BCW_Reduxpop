import React, { useEffect, useState, Fragment } from 'react';

import Button from '../Button/Button';

import './ErrorMessage.css';

function ErrorMessage(error) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(error);
  }, [error]);

  const closeError = () => {
    setMessage(null);
  };

  return (
    <Fragment>
      {message && (
        <div className="error-container">
          <div className="error-button-container">
            <Button onClick={closeError}>Close</Button>
          </div>
          <div className="error-message-container">
            <h2>{JSON.stringify(message)}</h2>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default ErrorMessage;
