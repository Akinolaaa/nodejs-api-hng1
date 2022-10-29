const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ 
    "slackUsername": "akinolaaa", 
    "backend": true, 
    "age": 22, 
    "bio": "a full stack web developer and computer science student" 
  }) 
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});