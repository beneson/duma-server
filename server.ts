import 'dotenv/config';
import express from 'express';
import { GET as getDocumentHandler } from './api/getdocument';
import { POST as openaiRealtimeHandler } from './api/openai-realtime';

const app = express();
app.use(express.text({ type: 'application/sdp' }));
app.use(express.json());

// Route for getdocument
app.get('/api/getdocument', async (req, res) => {
  const response = await getDocumentHandler({ request: req });
  
  // Transfer status and headers from the handler response
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  
  // Send the response body
  const body = await response.text();
  res.send(body);
});

// Route for openai-realtime
app.post('/api/openai-realtime', async (req, res) => {
  const response = await openaiRealtimeHandler({ request: req });
  
  // Transfer status and headers from the handler response
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  
  // Send the response body
  const body = await response.text();
  res.send(body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});