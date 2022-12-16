import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();
const PORT = process.env.PORT || 5000;

//ROUTES
app.get("/api/jobs", (req: Request, res: Response) => {
  res.json({ msg: "HELLO" });
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}, http://localhost:${PORT}`);
});
