const OpenAI = require('openai');




async function getChatGPTResponse(req, res) {
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
      return [];
    }
  }
}




module.exports.getChatGPTResponse = getChatGPTResponse;




//   } catch (error) {
//     console.error("Error:", error);
//     // Handle error accordingly
//     return getChatGPTResponse(req, res); // Restart the function on error
//   }
// }






// module.exports.getChatGPTResponse = async (req, res) => {
//   const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           "role": "user",
//           "content": `I have a job interview for a ${req.job} position
//            with ${req.experience} years of experience and I want to prepare,
//            give me an example of ${req.questions} questions that will be asked in the interview
//            and what is the answer,please give it to me in Json format .
//            without question marks and other punctuation marks start the line withe Capital letter`,


//           //  body :
//           //   {
//           //     "job" : string,
//           //     "experience" : string,
//           //     "questions" : int
//           //  }
//         }
//       ],
//       temperature: 0.5,
//       max_tokens: 1000,
//       top_p: 1,
//     });

//     let content = response.choices[0].message.content;

//     // Insert a comma between "answer1" and "question2" if missing
//   //  content = content.replace(/("answer\d+")("question\d+")/, '$1,$2');
//     console.log(content);
    
//     const qaPairs = JSON.parse(content);

//    // console.log(qaPairs);
//     // Initialize an array to store question-answer pairs
    
//     const resultArray = [];
//     // Iterate over the keys of the JSON object
//     Object.keys(qaPairs).forEach(key => {
//       // Push the key-value pair to the result array
//       resultArray.push(`${key}: ${qaPairs[key]}`);
//     });

//     // Now resultArray will contain all questions and answers
//    // console.log("Questions and Answers:");
//     //console.log(resultArray);

//     // Return the array
//     return resultArray;
    
//   } catch (error) {
//     console.error("Error:", error);
//     // Handle error accordingly
//     return getChatGPTResponse(req); // Return an empty array in case of error
//   }
// }
