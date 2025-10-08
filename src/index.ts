import express, { Express, json, Request, Response } from "express";
import { PrismaClient } from "./generated/prisma";
import { user } from "./controllers/user";
import cors from "cors";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";

export const prisma = new PrismaClient();

const app: Express = express();
const port = 4000;
// const checkJwt = auth({
//   audience:
// })

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

app.use(
  cors({
    origin: [process.env.FRONTEND_URL ?? ""],
    credentials: true,
  })
);

app.use("/user", user);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
