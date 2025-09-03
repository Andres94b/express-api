import express, { Express, Request, Response } from "express";
import { PrismaClient } from "./generated/prisma";

export const prisma = new PrismaClient(); // Prisma Client

const app: Express = express();
const port = 4000;

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

//   .findMany({
//     where: {
//       id: "0",
//     },
//   });
//   if (rslt == null) {
//     res.send("No data found");
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
