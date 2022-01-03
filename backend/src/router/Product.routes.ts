import { Router } from "express";
import {
  createProductHandler,
  getPageCountHandler,
  getProductHandler,
  getProductListHandler,
} from "../controller/Product.controller";

const router = Router();

router.post("/", createProductHandler);

router.get("/", getProductListHandler);

router.get("/countPage", getPageCountHandler);

router.get("/:productId", getProductHandler);
export default router;
