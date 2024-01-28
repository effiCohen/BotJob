// קובץ הריאקט (InterviewForm.js)
import React, { useState } from 'react';
import axios from 'axios';

const InterviewForm = () => {
  const [interviewData, setInterviewData] = useState({ /* נתונים של הראיון */ });

  const handleSaveInterview = async () => {
    try {
      // שליחת בקשת POST לשרת
      const response = await axios.post('http://localhost:3000/api/saveInterview', { interviewData });

      // התמודדות עם תשובת השרת
      if (response.data.success) {
        console.log('Interview saved successfully');
        // ניתן לבצע פעולות נוספות כאן או להציג הודעה למשתמש
      } else {
        console.error('Error saving interview:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving interview:', error.message);
    }
  };

  // טופס וכפתור שמפעיל את הפונקציה לשמירת הראיון
//   return (
//     <div>
//       {/* טופס עם שדות הנתונים של הראיון */}
//       {/* ... */}

//       {/* כפתור לשמירת הראיון */}
//       <button onClick={handleSaveInterview}>Save Interview</button>
//     </div>
//   );
};

export default InterviewForm;
