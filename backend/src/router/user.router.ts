import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asynceHandler from "express-async-handler";
import { IUser, UserModel } from "../models/user.model";
import { BAD_REQUEST } from "../constants/httpStatus";
import bcrypt from "bcryptjs";

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
      res.status(BAD_REQUEST).send("Invalid credentials!");
    }
  })
);

router.post(
  "/register",
  asynceHandler(async (req, res) => {
    const { email, password, name, address } = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(BAD_REQUEST).send("User with this email already exists!");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = {
      // id: "",
      name,
      address,
      email: email.toLowerCase(),
      password: encryptedPassword,
      isAdmin: false,
      token: "",
    };

    const dbUser = await UserModel.create(newUser);

    res.send(generateToken(dbUser));
  })
);

const generateToken = (user: any) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET!,
    { expiresIn: "3d" }
  );

  user.token = token;
  console.log(user);
  return user;
};

export default router;
