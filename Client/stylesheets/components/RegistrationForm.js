import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('your-server-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Registration successful, you can handle success here
      console.log('Registration successful');
    } catch (error) {
      // Registration failed, handle error here
      console.error('Registration error:', error.message);
    }
  };


};

export default RegistrationForm;
