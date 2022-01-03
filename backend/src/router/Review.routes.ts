import { Router } from "express";
import {
  createReviewHandler,
  getProductReviewsHandler,
} from "../controller/Review.controller";
import requireUser from "../middleware/requireUser";

const router = Router();

router.post("/", [requireUser], createReviewHandler);

router.get("/", getProductReviewsHandler);

export default router;
