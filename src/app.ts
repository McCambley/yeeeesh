import express, { Request, Response } from "express";
import mysql from "mysql";
import cron from "node-cron";

const app = express();

const port = process.env.PORT || 3000;

const sayHello = () => {
  console.log("running a task every minute");
};

app.get("/", (req: Request, res: Response) => {
  res.send({
    data: JSON.stringify(cron, null, 2),
    message: "Hello!",
  });
});

app.listen(port, () => {
  cron.schedule("* * * * *", sayHello);
  console.log("Welcome back to ✨ Express ✨ my friend");
});
