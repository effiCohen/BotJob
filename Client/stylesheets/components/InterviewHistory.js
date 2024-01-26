import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InterviewHistory = ({ interviewID }) => {
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await axios.get(`/interview/${interviewID}`);
        setInterview(response.data);
      } catch (error) {
        console.error('Error fetching interview history:', error);
      }
    };

    fetchInterview();
  }, [interviewID]);

};

export default InterviewHistory;
