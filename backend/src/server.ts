import express from "express";
import cors from "cors";
import routerFood from "./router/food.router";
import routerUser from "./router/user.router";
import dotenv from "dotenv";
import { dbConnect } from "./configs/database.config";
import routerOrder from "./router/order.router";

dotenv.config();
const app = express();
dbConnect();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(express.json());

app.use("/api/food", routerFood);
app.use("/api/user", routerUser);
app.use("/api/orders", routerOrder);

app.listen(4201, () => {
  console.log("Backend running");
});
