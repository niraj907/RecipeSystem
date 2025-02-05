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

// Cloudinary Configuration Check
if (!process.env.CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("Cloudinary credentials are missing");
  process.exit(1); // Exit server if credentials are not set
}

// Middleware
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use(express.json({ limit: '50mb' })); // Support larger payloads
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


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