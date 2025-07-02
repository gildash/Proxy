import express from 'express';
import fetch from 'node-fetch';
const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Project': process.env.OPENAI_PROJECT_ID
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Proxy error' });
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
