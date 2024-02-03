// const axios = require('axios');

// // const prompt = `Hi ChatGPT,I hope this message finds you well.
// // I'm looking to simulate an interview to assess my skills in Java programming.
// // I'd like to receive feedback on my performance,including a score and detailed comments on each of my answers.`;

// exports.openaiMiddleware = async (req, res, next) => {
//   try {
//     const apiKey = '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'; 
//     const apiUrl = 'https://api.openai.com/v1/chat/completions';

//     const response = await axios.post(
//       apiUrl,
//       {
//         prompt: req.body.prompt, // Assuming the prompt is coming from the request body
//         max_tokens: 150,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKey}`,
//         },
//       }
//     );

//     // Add the OpenAI response to the request object for further use if needed
//     req.openaiResponse = response.data.choices[0].text;
//     // Continue with the next middleware or route handler
//     next();
//   } catch (error) {
//     // Handle errors
//     console.error('Error connecting to OpenAI API :', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.openaiMiddleware = async (req, res, next) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": req.body.userMessage, // Assuming you are sending user input in the request body
        }
      ],
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1,
    });
    
    // Attach the OpenAI response to the request object
    req.openaiResponse = response.data.choices[0].text.trim();
    
    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors, e.g., log them or send an appropriate response to the client
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


