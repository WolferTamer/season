import express, { type ErrorRequestHandler } from "express";
import mongoose from "mongoose";
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const PORT = process.env.PORT ?? 1234;

const app = express();

const connectMongo = async () => {
  try {
    const uri = process.env.MONGOURI ?? "mongodb://localhost:27017";
    await mongoose.connect(uri);
    console.log("MongoDb connected successfully");
  } catch (e: any) {
    console.error(e.message);
    process.exit(1);
  }
};

connectMongo();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from express app!");
});

const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  res.status(error.status || 500);
  console.log("ERROR", error);
  res.json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
};

app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
