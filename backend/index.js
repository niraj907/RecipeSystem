import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itemRoute from './routes/itemRoute.js';
import { connectDB } from './config/db.js';
import fileUpload from 'express-fileupload';

dotenv.config();

const app = express();
const PORT = 4000;

// Middleware

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true ,limit: '50mb' })); 
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is working',
    success: true,
  });
});

app.use('/api', itemRoute);


// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at http://localhost:${PORT}`);
});

export default app;