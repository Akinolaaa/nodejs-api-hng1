const { openai } = require('../models/openai');

const getIntroduction = (req, res) => {
  res.status(200).json({ 
    "slackUsername": "akinolaaa", 
    "backend": true, 
    "age": 22, 
    "bio": "a full stack web developer and computer science student" 
  }) 
}

const simpleArithmetic = (req,res) => {

  const { x, y, operation_type } = req.body;

  switch(operation_type.toLowerCase()){
    case "addition":
      solution = x + y; break;
    case "multiplication":
      solution = x * y; break;
    case "subtraction":
      solution = x - y; break;
    default:
      solution = "special"; 
      break;
  }

  if(solution==="special") {
    const getSolutionFromOpenai = async(callback) => {
      
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "Q: Multiply 5 and 6\nA: 30\n\nQ: Add 3 to 10\nA: 13\n\nQ: what is 12 subtracted from 20?\nA: 7\n\nQ: What is 2 plus 2?\nA: 4\n\nQ: What is 2 multiplied by 8?\nA: 16\n\nQ: What is 34 minus 30?\nA: 4\n\nQ: Can you please add the following numbers together - 13 and 29?\nA: 42\n\nQ: " + operation_type +"\n",
        temperature: 0,
        max_tokens: 64,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\n\n"],
      });

      //
      return response.data.choices[0].text.slice(3);
    }
    getSolutionFromOpenai()
      .then((val) => res.status(200).json({
        slackUsername: 'akinolaaa', 
        operation_type: operation_type,
        result: Number(val) 
      }));

  } else {
    res.status(200).json({
      slackUsername: 'akinolaaa', 
      operation_type: operation_type,
      result: solution 
    })
  }

}

module.exports = {
  getIntroduction, simpleArithmetic
}


/* //open ai test
  const endpoint = 'https://api.openai.com/v1/completions';
  const data = {
    // "file": process.env.ANSWERS_FILE,
    "documents": documents,
    "question": "add 5 and 6",
    "search_model": "ada",
    "model": "curie",
    "examples_context": "25",
    "examples": [["Can you please add the following numbers together - 13 and 25.", "12"], ["multiply 12 and 12", "144"]],
    "max_tokens": 1,
    "temperature": 0,
    "return_prompt": false,
    "expand": ["completion"],
    "stop": ["\n", "<|endoftext|>"],
  }
  client.post(endpoint, data)
    .then(result => {
      res.send({ "answer": result.data.answers[0] })
    }).catch(err => {
      // deal with API request errors
      res.send({ "answer": `Sorry, there was an API error. The error was '${err.message}'` })
    }); */

  //res.status(200).json({  api_response
    /* slackUsername: "akinolaaa", 
    operation_type : operation_type.toLowerCase(), 
    result: solution  */
  //});