import React, { useState } from 'react';
import axios from 'axios';

const AskChatGpt = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAskGpt = async () => {
    try {
      const apiKey = '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';
      const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
      Authorization: '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'; 


      const requestBody = {
        prompt: question,
        max_tokens: 150,
      };

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      setResponse(response.data.choices[0].text);
    } catch (error) {
      console.error('Error asking GPT-3:', error);
    }
  };

};

export default AskChatGpt;

