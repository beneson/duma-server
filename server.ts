import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GET as getDocumentHandler } from './api/getdocument';
import { POST as openaiRealtimeHandler } from './api/openai-realtime';
import { GET as supportdata } from './api/supportdata';

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
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  const body = await response.text();
  res.send(body);
});

// Route for openai-realtime
app.post('/api/openai-realtime', cors(openCorsOptions), async (req, res) => {
  const response = await openaiRealtimeHandler({ request: req });
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  const body = await response.text();
  res.send(body);
});

app.get('/api/supportdata', cors(openCorsOptions), async (req, res) => {
  const response = await supportdata({ request: req });
  res.status(response.status);
  response.headers.forEach((value: string, key: string) => {
    res.setHeader(key, value);
  });
  const body = await response.text();
  res.send(body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});