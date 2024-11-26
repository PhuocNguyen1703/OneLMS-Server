import express from "express";
import dotenv from "dotenv";

dotenv.config();

const bootServer = () => {
  const app = express();

  app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running");
    
  })
};
