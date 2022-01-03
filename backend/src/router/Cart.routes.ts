import { Router } from "express";
import {
  addToCartHandler,
  createCartHandler,
  findCartHandler,
  getCartDetailsHandler,
  manageQuantityHandler,
  removeFromCartHandler,
} from "../controller/Cart.controller";
import requireUser from "../middleware/requireUser";

const router = Router();

router.get("/", [requireUser], findCartHandler);

router.get("/details", [requireUser], getCartDetailsHandler);

router.post("/", [requireUser], createCartHandler);

router.patch("/add", [requireUser], addToCartHandler);

router.patch("/quantity", [requireUser], manageQuantityHandler);

router.delete("/remove", [requireUser], removeFromCartHandler);

export default router;
