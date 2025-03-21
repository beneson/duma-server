import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GET as getDocumentHandler } from './api/getdocument';
import { POST as openaiRealtimeHandler } from './api/openai-realtime';

const app = express();
app.use(express.text({ type: 'application/sdp' }));
app.use(express.json());


const defaultCorsOptions = {
  origin: ['http://localhost:4321', 'https://www.duma.live', 'https://duma.live'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
const openCorsOptions = {
  origin: '*', // Allow any origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(defaultCorsOptions));

// Route for getdocument
app.get('/api/getdocument', cors(openCorsOptions), async (req, res) => {
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
app.post('/api/openai-realtime', cors(openCorsOptions), async (req, res) => {
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

app.get('/api/supportdata', cors(openCorsOptions), (req, res) => {
  res.send('Hello World');
  //vincular com a função supportdata
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});