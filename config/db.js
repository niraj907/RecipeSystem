import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    // PDQhcD70XbJFAn1h
    const conn = await mongoose.connect('mongodb+srv://14ryniraj:gXfsNSfAOeaghQVi@cluster0.ch9fy.mongodb.net/RecipeSystem');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1); // Stops the program because of an error.
  }
};
