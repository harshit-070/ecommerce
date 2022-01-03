import { Router } from "express";
import {
  createUserSessionHandler,
  createUserSessionWithGoogleHandler,
} from "../controller/Session.controller";

const router = Router();

router.post("/", createUserSessionHandler);

router.post("/google", createUserSessionWithGoogleHandler);

export default router;
