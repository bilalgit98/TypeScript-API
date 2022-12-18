import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getXataClient, Jobs } from "./xata";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const xata = getXataClient();

//ROUTES
app.get("/api/jobs", async (req: Request, res: Response) => {
  try {
    const job = await xata.db.jobs.getAll();
    res.json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "SOMETHING WENT WRONG PLEASE TRY AGAIN!" });
  }
});

app.post("/api/jobs", async (req: Request, res: Response) => {
  try {
    const job = req.body;
    const createdJob = await xata.db.jobs.create(job);
    res.json(createdJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "SOMETHING WENT WRONG PLEASE TRY AGAIN!" });
  }
});

app.put("/api/jobs/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const job = req.body;
    const updatedJob = await xata.db.jobs.update(id, job);
    res.json(updatedJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "SOMETHING WENT WRONG PLEASE TRY AGAIN!" });
  }
});

app.delete("/api/jobs/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedRecord = await xata.db.jobs.delete(id);
    res.json(deletedRecord);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "SOMETHING WENT WRONG PLEASE TRY AGAIN!" });
  }
});
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}, http://localhost:${PORT}`);
});
