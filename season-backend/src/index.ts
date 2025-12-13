import express, { type ErrorRequestHandler } from "express";
import mongoLib from "./lib/mongo-lib.js";

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const PORT = process.env.PORT ?? 1234;

const app = express();

mongoLib().then((val) => {
  console.log(val);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from express app!");
});

import userRouter from "./routes/user-routes.js";

app.use("/user", userRouter);

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
