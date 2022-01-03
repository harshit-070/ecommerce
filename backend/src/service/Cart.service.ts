import { FilterQuery } from "mongoose";
import { ICart, ICreateCart } from "../interface/Cart.interface";
import { IProduct } from "../interface/Product.interface";
import CartModel from "../model/Cart.model";

export async function createCart(input: ICreateCart) {
  return await CartModel.create(input);
}

export async function findCart(filter: FilterQuery<ICart>) {
  return await CartModel.findOne(filter);
}

export async function pushProductToCart(
  filter: FilterQuery<ICart>,
  { product, quantity }: { product: IProduct["_id"]; quantity: number }
) {
  return await CartModel.findOneAndUpdate(
    filter,
    {
      $push: { products: { product, quantity } },
    },
    { new: true }
  );
}

export async function findProductInCart({
  cartId,
  productId,
}: {
  cartId: ICart["_id"];
  productId: IProduct["_id"];
}) {
  return await CartModel.findOne({
    _id: cartId,
    isOrdered: false,
    "products.product": productId,
  });
}

export async function removeFromCart(
  filter: FilterQuery<ICart>,
  { productId }: { productId: IProduct["_id"] }
) {
  return await CartModel.findOneAndUpdate(
    filter,
    {
      $pull: { products: { product: productId } },
    },
    { new: true }
  ).select({ user: 1 });
}

export async function updateQuantity(
  filter: FilterQuery<ICart>,
  {
    productId,
    newQuantity,
  }: { productId: IProduct["_id"]; newQuantity: number }
) {
  return await CartModel.findOneAndUpdate(
    { ...filter, "products.product": productId },
    { $set: { "products.$.quantity": newQuantity } },
    { new: true }
  );
}

export async function getCartDetails(filter: FilterQuery<ICart>) {
  return await CartModel.findOne(filter)
    .populate("products.product", "name price image")
    .lean();
}
