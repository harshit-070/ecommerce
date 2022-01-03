import { FilterQuery } from "mongoose";
import { ICreateProduct, IProduct } from "../interface/Product.interface";
import ProductModel from "../model/Product.model";

export async function createProduct(input: ICreateProduct) {
  return await ProductModel.create(input);
}

export async function getProduct(filter: FilterQuery<IProduct>) {
  return await ProductModel.findOne(filter).select({ available: 0 }).lean();
}

export async function getProductList({
  skip,
  limit,
}: {
  skip: number;
  limit: number;
}) {
  return await ProductModel.find({})
    .skip(skip)
    .limit(limit)
    .lean()
    .select({ description: 0, available: 0 });
}

export async function getProductsCount() {
  return await ProductModel.estimatedDocumentCount();
}

export async function getProductRating(filter: FilterQuery<IProduct>) {
  return await ProductModel.findOne(filter).select({
    ratingSum: 1,
    numberOfRatings: 1,
  });
}

export async function getProductAvailableInStock(
  filter: FilterQuery<IProduct>
) {
  return await ProductModel.findOne(filter).select({ available: 1 }).lean(true);
}
