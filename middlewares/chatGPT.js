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
          "content":`I have a job interview for a ${req.body.position} position with ${req.body.experience} years of experience and I want to prepare. Give me  an example of ${req.body.questions} questions that will be asked in the interview.please give it to me in Json format.without a question marks`, 
        //  body :
        //   {
        //     "position" : string,
        //     "experience" : int,
        //     "questions" : int
        //  }
        }
      ],
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 1,
    });

    console.log(response.choices[0].message.content); 
    req.openaiResponse =  response.choices[0].message.content;
    
    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors, e.g., log them or send an appropriate response to the client
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Internal Server Error" , error });
  }
};


