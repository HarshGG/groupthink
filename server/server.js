// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse JSON bodies

const PORT = process.env.PORT || 5000;

// OpenAI API endpoint
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Route to handle OpenAI API calls
app.post('/api/openai', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      { prompt: prompt },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error making request to OpenAI API');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
