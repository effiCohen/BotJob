import React, { useState } from 'react';

const ConfirmationForm = () => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirmation = async () => {
    try {
      const response = await fetch('your-server-confirmation-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmationCode }),
      });

      if (!response.ok) {
        throw new Error('Code verification failed');
      }

      // Code verification successful, redirect to login page
      window.location.href = '/login';
    } catch (error) {
      // Code verification failed, handle error here
      setErrorMessage('Incorrect code. Please try again.');
      console.error('Code verification error:', error.message);
    }
  };

 
};

export default ConfirmationForm;
