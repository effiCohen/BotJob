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
           and what is the answer,please give it to me in Json format .
           without question marks and other punctuation marks start the line withe Capital letter`,


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

    let content = response.choices[0].message.content;

    // Insert a comma between "answer1" and "question2" if missing
  //  content = content.replace(/("answer\d+")("question\d+")/, '$1,$2');
    console.log(content);
    
    const qaPairs = JSON.parse(content);

   // console.log(qaPairs);
    // Initialize an array to store question-answer pairs
    
    const resultArray = [];
    // Iterate over the keys of the JSON object
    Object.keys(qaPairs).forEach(key => {
      // Push the key-value pair to the result array
      resultArray.push(`${key}: ${qaPairs[key]}`);
    });

    // Now resultArray will contain all questions and answers
   // console.log("Questions and Answers:");
    //console.log(resultArray);

    // Return the array
    return resultArray;
    
  } catch (error) {
    console.error("Error:", error);
    // Handle error accordingly
    return []; // Return an empty array in case of error
  }
}

//     const content = response.choices[0].message.content;
//     console.log(content);
//     // Splitting content into lines and then into question-answer pairs
//     const pairs = content.split('\n').map(pair => {
//       if (pair.includes('Question')) {
//         const question = pair.replace('Question', '').trim();
//         return { question: question, answer: '' };
//       } else if (pair.includes('Answer')) {
//         const answer = pair.replace('Answer', '').trim();
//         return { answer: answer };
//       } else {
//         return null;
//       }
//     }).filter(pair => pair !== null);
//     // Combine consecutive pairs into one object

//     const questionAnswers = [];
//     let currentPair = {};
//     pairs.forEach(pair => {
//       if ('question' in pair) {
//         if (Object.keys(currentPair).length !== 0) {
//           questionAnswers.push(currentPair);
//         }
//         currentPair = { question: pair.question };
//       } else if ('answer' in pair) {
//         currentPair.answer = pair.answer;
//       }
//     });
//     questionAnswers.push(currentPair); // Push the last pair
//     return questionAnswers;
//   } catch (error) {
//     console.error("OpenAI API Error:", error);
//     return res.status(500).json(err); // Returning null to indicate an error occurred
//   }
// };

//     console.log(response.choices[0].message.content);
//     const responseGPT = { questions:req.questions , data: response.choices[0].message.content} ;
//     return  responseGPT;
//   } catch (error) {
//     // Handle errors, e.g., log them or send an appropriate response to the client
//     console.error("OpenAI API Error:", error);
//     res.status(500).json({ error: "Internal Server Error", error });
//   }
// };