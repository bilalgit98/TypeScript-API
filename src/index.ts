import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getXataClient, Jobs } from "./xata";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const xata = getXataClient();

type ResponsesType<T> =
  | {
      error: null | string;
    }
  | { data: T };

//ROUTES
app.get(
  "/api/jobs",
  async (req: Request, res: Response<ResponsesType<Jobs[]>>) => {
    try {
      const job = await xata.db.jobs.getAll();
      return res.status(200).json({ data: job });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "SOMETHING WENT WRONG PLEASE TRY AGAIN!" });
    }
  }
);

app.post(
  "/api/jobs",
  async (req: Request<{}, {}, Jobs>, res: Response<ResponsesType<Jobs>>) => {
    try {
      const job = req.body;
      const createdJob = await xata.db.jobs.create(job);
      return res.status(201).json({ data: createdJob });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "SOMETHING WENT WRONG PLEASE TRY AGAIN!" });
    }
  }
);

app.put(
  "/api/jobs/:id",
  async (
    req: Request<{ id: string }, {}, Jobs>,
    res: Response<ResponsesType<Jobs>>
  ) => {
    try {
      const id = req.params.id;
      const job = req.body;
      const updatedJob = await xata.db.jobs.update(id, job);
      if (!updatedJob) {
        return res.status(404).json({ error: " JOB NOT FOUND!" });
      }
      return res.status(200).json({ data: updatedJob });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "SOMETHING WENT WRONG PLEASE TRY AGAIN!" });
    }
  }
);

app.delete(
  "/api/jobs/:id",
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response<ResponsesType<Jobs>>
  ) => {
    try {
      const id = req.params.id;
      const deletedRecord = await xata.db.jobs.delete(id);
      if (!deletedRecord) {
        return res.status(404).json({ error: "SOMETHING WENT WRONG" });
      }
      return res.status(200).json({ data: deletedRecord });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "SOMETHING WENT WRONG PLEASE TRY AGAIN!" });
    }
  }
);
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}, http://localhost:${PORT}`);
});
