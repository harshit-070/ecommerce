import { Response } from "express";
import ErrorHandler from "./errorHandler";

const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({
    status: "error",
    statusCode,
    message,
  });
};

export default handleError;
