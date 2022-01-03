import { NextFunction, Request, Response } from "express";
import { ceil, get } from "lodash";
import config from "config";
import {
  createProduct,
  getProduct,
  getProductList,
  getProductsCount,
} from "../service/Product.service";
import c from "config";

export async function createProductHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await createProduct(req.body);
    return res.send(product);
  } catch (error) {
    next(error);
  }
}

export async function getProductHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = get(req.params, "productId");
    const product = await getProduct({ _id: productId });
    return res.send(product);
  } catch (error) {
    next(error);
  }
}

export async function getProductListHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = 15;
    const page = parseInt(req.query.page as string) || 0;
    const skip = (page - 1) * limit;
    const productList = await getProductList({ skip, limit });
    return res.send(productList);
  } catch (error) {
    next(error);
  }
}

export async function getPageCountHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const count = await getProductsCount();
    const pages = ceil(count / config.get<number>("productLimitPerPage"));
    return res.send({ pages });
  } catch (error) {
    next(error);
  }
}
