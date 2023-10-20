import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asynceHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

const router = Router();

router.get(
  "/seed",
  asynceHandler(async (req, res) => {
    const foodCount = await FoodModel.countDocuments();
    if (foodCount > 0) {
      res.send("food seed done");
      return;
    }
    await FoodModel.create(sample_foods);
    res.send("seed finished");
  })
);

router.get(
  "/",
  asynceHandler(async (req, res) => {
    const result = await FoodModel.find();
    res.send(result);
  })
);

router.get(
  "/search/:searchText",
  asynceHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchText, "i");
    const result = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(result);
  })
);

router.get(
  "/tag",
  asynceHandler(async (req, res) => {
    const result = await FoodModel.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $project: { _id: 0, name: "$_id", count: "$count" } },
    ]).sort({ count: -1 });
    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };
    result.unshift(all);
    res.send(result);
  })
);

router.get(
  "/tag/:searchTag",
  asynceHandler(async (req, res) => {
    const result = await FoodModel.find({ tags: req.params.searchTag });
    res.send(result);
  })
);

router.get(
  "/:id",
  asynceHandler(async (req, res) => {
    const result = await FoodModel.findById(req.params.id);
    res.send(result);
  })
);

export default router;
