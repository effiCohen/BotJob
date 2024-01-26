// קובץ השרת (server.js)
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// הגדרת קשר עם מסד נתונים
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// הגדרת מודל לאובייקט המכיל את הנתונים שלך
const Interview = mongoose.model('Interview', {
  interviewData: Object,
});

// מסלול לקבלת בקשות מהלקוח
app.post('/api/saveInterview', async (req, res) => {
  try {
    const { interviewData } = req.body;

    // שמירת הראיון במסד הנתונים
    const newInterview = new Interview({ interviewData });
    await newInterview.save();

    // שליחת תשובה ללקוח
    res.json({ success: true, message: 'Interview saved successfully' });
  } catch (error) {
    console.error('Error saving interview:', error);
    res.status(500).json({ success: false, message: 'Error saving interview' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
