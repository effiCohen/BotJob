import React, { useState, useEffect } from 'react';

const UserStatistics = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // כאשר הדף נטען, נבצע בקשה לשרת לקבלת סטטיסטיקת משתמשים
    fetch('http://localhost:3000/user-statistics')
      .then(response => response.json())
      .then(data => {
        // עדכון של הסטטיסטיקה בהתאם לתוצאה שקיבלנו מהשרת
        setUserCount(data.userCount);
      })
      .catch(error => {
        console.error('Error fetching user statistics:', error);
      });
  }, []); // [] מבצע את הבקשה רק פעם אחת כאשר הדף נטען

  app.get("/user-statistics", async (req, res) => {
    try {
        // קבלת סטטיסטיקות מDB
        const userCount = await ChatMessage.countDocuments();
        res.status(200).json({ userCount });
    } catch (error) {
        console.error("Error fetching user statistics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
 
};

export default UserStatistics;
