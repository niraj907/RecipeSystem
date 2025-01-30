import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import fileUpload from 'express-fileupload';

import recipeRoutes from './routes/recipe.route.js'
import authRoutes from './routes/auth.route.js';
import countRoutes from './routes/count.route.js'

dotenv.config();

const app = express();
const PORT = 4000;

// Middleware
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
3
app.use(express.json()); // allow us to parse incoming requests: req.body
app.use(cookieParser()); // allows us to parse incoming cookies
app.use(express.urlencoded({ extended: true ,limit: '50mb' })); 
app.use(cors());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",  // Frontend URL
  credentials: true,  // Corrected typo
  methods: ["GET", "POST", "PUT", "DELETE"],  // Corrected typo
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is working',
    success: true,
  });
});

app.use(express.static('public'));
app.use('/recipe/api', recipeRoutes); // recipe route
app.use('/api/a1/auth',authRoutes); // user route
app.use("/api/count",countRoutes);

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at http://localhost:${PORT}`);
});

export default app;