import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itemRoute from './routes/itemRoute.js';
import { connectDB } from './config/db.js';
import fileUpload from 'express-fileupload';

import authRoutes from './routes/auth.route.js'
dotenv.config();

const app = express();
const PORT = 4000;

// Middleware
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
app.use(express.json()); // allow us to parse incoming requests: req.body
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
app.use('/api/auth',authRoutes)

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at http://localhost:${PORT}`);
});

export default app;