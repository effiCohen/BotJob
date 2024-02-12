const OpenAI = require('openai');

module.exports.getChatGPTResponse = async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": `I have a job interview for a ${req.job} position
           with ${req.experience} years of experience and I want to prepare,
           give me an example of ${req.questions} questions that will be asked in the interview
           and what is the best answer,please give it to me in Json format.
           without question marks and other punctuation marks`,
          //  body :
          //   {
          //     "job" : string,
          //     "experience" : string,
          //     "questions" : int
          //  }
        }
      ],
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 1,
    });
    console.log(response.choices[0].message.content);
    const responseGPT = { questions:req.questions , data: response.choices[0].message.content} ;
    return  responseGPT;
  } catch (error) {
    // Handle errors, e.g., log them or send an appropriate response to the client
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};