import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asynceHandler from "express-async-handler";
import { UserModel } from "../models/user.model";
const router = Router();

router.get(
  "/seed",
  asynceHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
      res.send("food seed done");
      return;
    }
    await UserModel.create(sample_users);
    res.send("seed finished");
  })
);

router.post(
  "/login",
  asynceHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (user) {
      res.send(generateToken(user));
    } else {
      res.status(400).send("Invalid credentials!");
    }
  })
);

const generateToken = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "mySecretKey",
    { expiresIn: "3d" }
  );
  user.token = token;
  return user;
};

export default router;
