const OpenAI = require('openai');

//Function to send a question to chat
async function getChatGPTResponse(req, res, retryCount = 0) {
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
           and what is the answer,please give it to me in Json format .
           without question marks and other punctuation marks start the line withe Capital letter`,
        }
      ],
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 1,
    });

    let content = response.choices[0].message.content;
    const qaPairs = JSON.parse(content);

    const resultArray = [];
    Object.keys(qaPairs).forEach(key => {
      resultArray.push(`${key}: ${qaPairs[key]}`);
    });

    return resultArray;

  } catch (error) {
    console.error("Error:", error);
    // Handle error accordingly
    if (retryCount < 5) {
      // Retry the function with incremented retry count
      return getChatGPTResponse(req, res, retryCount + 1);
    } else {
      // If retry limit exceeded, return an empty array
      console.error("Retry limit exceeded, returning empty array.");
      return ;
    }
  }
}


module.exports.getChatGPTResponse = getChatGPTResponse;

