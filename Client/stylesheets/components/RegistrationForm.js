import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // הגעה לכאן אומרת שהבקשה לשרת הושלמה, אך השרת ייתן תגובה במבנה של שגיאה
        throw new Error(responseData.message);
      }

      // Registration successful, you can handle success here
      setRegistrationStatus({ success: true, message: 'Registration successful' });
    } catch (error) {
      // Registration failed, handle error here
      setRegistrationStatus({ success: false, message: error.message });
    }
  };

  
};

export default RegistrationForm;
