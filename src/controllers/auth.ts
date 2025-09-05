import express, { Express, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma";

export const auth = express.Router();

const salt = bcrypt.genSaltSync(10);
const prisma = new PrismaClient();

auth.get("/", (req: Request, res: Response) => {
  res.send("auth home page");
});

auth.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //   res.json({ username, password });
  const hash = bcrypt.hashSync(password, salt);

  const result = await prisma.user.create({
    data: {
      email: email,
      password: hash,
    },
  });

  res.send(result);
  // res.json({ email, hash });
});

auth.get("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user !== null) {
    const isValid = await bcrypt.compare(password, user.password);
    res.send({
      valid: isValid,
    });
  } else {
    res.send("No user found with this email");
  }
});
