
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


