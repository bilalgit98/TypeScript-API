import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();
const PORT = process.env.PORT || 5000;

//ROUTES
app.get("/api/jobs", (req: Request, res: Response) => {
  res.json({ msg: "HELLO get" });
});

app.post("/api/jobs", (req: Request, res: Response) => {
  res.json({ msg: "HELLO post" });
});

app.put("/api/jobs", (req: Request, res: Response) => {
  res.json({ msg: "HELLO put" });
});

app.delete("/api/jobs/:id", (req: Request, res: Response) => {
  res.json({ msg: "HELLO id delete" });
});
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}, http://localhost:${PORT}`);
});
