import express from "express";
import bodyParser from "body-parser";
import usersRouter from "./routes/users.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/users", usersRouter);

app.get("/", (req, res) =>{
    res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});