import express, { Express, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma";
import jwt from "jsonwebtoken";

export const user = express.Router();

const salt = bcrypt.genSaltSync(10);
const prisma = new PrismaClient();

// user.get("/me", (req, res) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.sendStatus(401);

//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.sendStatus(403);
//     res.json({ user: decoded });
//   });
// });

user.get("/", (req: Request, res: Response) => {
  res.send("auth home page");
});

user.post("/register", async (req: Request, res: Response) => {
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

user.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

  if (!process.env.JWT_SECRET) {
    throw new Error("jwt secret is not defined");
  }

  const token = await jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });

  // if (user !== null) {
  //   const isValid = await bcrypt.compare(password, user.password);
  //   return res.json({
  //     valid: isValid,
  //     name: user.email,
  //   });
  // } else {
  //   return res.send("No user found with this email");
  // }
});
