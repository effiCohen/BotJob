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

  app.post("/interviews", async (req, res) => {
    const { userId, message } = req.body;

    try {
        // שמירת הודעה בDB
        const newMessage = new ChatMessage({ userId, message });
        await newMessage.save();

        // משלוח הודעה ללקוח עם ניקוד והצעות תשובות
        const responseToClient = {
            message: "Your message has been received",
            score: calculateScore(message), // פונקציה לחישוב ניקוד
            suggestions: getReplySuggestions() // פונקציה לקבלת הצעות תשובות
        };

        res.status(200).json(responseToClient);
    } catch (error) {
        console.error("Error saving chat message:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

};

export default Interviews;
