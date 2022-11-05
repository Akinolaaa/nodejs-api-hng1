const express = require('express');
require('dotenv').config();
const { getIntroduction, simpleArithmetic } = require('./controllers/controller');
const app = express();

app.use(express.json());

app.get('/', getIntroduction);

app.post('/', simpleArithmetic);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});