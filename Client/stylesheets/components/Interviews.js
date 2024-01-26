import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Interviews = ({ clientID }) => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(`/interviews/${clientID}`);
        setInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviews();
  }, [clientID]);


};

export default Interviews;
