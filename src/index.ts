import express, { Express, json, Request, Response } from "express";
import { PrismaClient } from "./generated/prisma";
import bcrypt from "bcryptjs";
import { auth } from "./controllers/auth";

export const prisma = new PrismaClient();

const app: Express = express();
const port = 4000;

app.use(json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/prisma-client", async (req: Request, res: Response) => {
  const rslt = await prisma.resume.create({
    data: {
      name: "test 1 resume",
      description: "description test 1",
      summary: "summary test 1",
    },
  });
  res.json(rslt);
});

app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
