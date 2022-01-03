import { Router } from "express";
import {
  createUserHandler,
  createUserWithGoogleHandler,
} from "../controller/User.controller";

const router = Router();

router.post("/", createUserHandler);

router.post("/google", createUserWithGoogleHandler);

export default router;
