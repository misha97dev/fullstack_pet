import { Router } from "express";
import asynceHandler from "express-async-handler";
import { BAD_REQUEST } from "../constants/httpStatus";
import { OrderModel } from "../models/order.model";
import { OrderStatusEnum } from "../constants/orderStatus";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();
router.use(authMiddleware);

router.post(
  "/create",
  asynceHandler(async (req: any, res: any) => {
    const requestOrder = req.body;
    if (requestOrder <= 0) {
      res.status(BAD_REQUEST).send("Cart is empty!");
      return;
    }
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatusEnum.NEW,
    });

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

router.get(
  "/new-order",
  asynceHandler(async (req: any, res) => {
    const result = await getNewOrderForCurrUser(req);

    if (result) res.send(result);
    else res.status(BAD_REQUEST).send();
  })
);

router.post(
  "/pay",
  asynceHandler(async (req: any, res: any) => {
    const { paymentId } = req.body;

    const order = await getNewOrderForCurrUser(req);

    if (!order) {
      res.status(BAD_REQUEST).send("Order not found!");
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatusEnum.PAYED;
    await order.save();
    res.send(order._id);
  })
);

async function getNewOrderForCurrUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatusEnum.NEW,
  });
}

export default router;
