import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import ErrorHandler from "../middleware/errorHandler";
import {
  createCart,
  findCart,
  findProductInCart,
  getCartDetails,
  pushProductToCart,
  removeFromCart,
  updateQuantity,
} from "../service/Cart.service";
import { getProductAvailableInStock } from "../service/Product.service";

export async function createCartHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user._id;
    const cart = await createCart({ user, isOrdered: false });
    return res.send(cart);
  } catch (error) {
    next(error);
  }
}

export async function findCartHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user._id;
    const cart = await findCart({ user, isOrdered: false });
    // If there is not cart then create the new one and send one
    if (!cart) {
      const newCart = await createCart({ user, isOrdered: false });
      return res.send(newCart);
    }
    return res.send(cart);
  } catch (error) {
    next(error);
  }
}

export async function addToCartHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user._id;
    const productId = get(req.body, "product") as string;
    const cartId = get(req.body, "cart") as string;
    const quantity = get(req.body, "quantity") as number;

    const cart = await findProductInCart({ cartId, productId });
    if (cart) {
      throw new ErrorHandler(409, "Product Already Exist in Card");
    }
    const cartProduct = await pushProductToCart(
      { _id: cartId, user },
      { quantity, product: productId }
    );

    if (!cartProduct) {
      throw new ErrorHandler(403, "Uauthorized");
    }
    return res.send(cartProduct);
  } catch (error) {
    next(error);
  }
}

export async function removeFromCartHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user._id;
    const cartId = get(req.body, "cart") as string;
    const productId = get(req.body, "product") as string;

    const cart = await removeFromCart({ _id: cartId, user }, { productId });

    return res.status(204).send(cart);
  } catch (error) {
    next(error);
  }
}

export async function manageQuantityHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user._id;
    const cartId = get(req.body, "cart") as string;
    const productId = get(req.body, "product") as string;
    const quantity = get(req.body, "quantity") as number;

    if (quantity <= 0) {
      throw new ErrorHandler(400, "Quantity cannot be negative or zero");
    }
    const product = await getProductAvailableInStock({ _id: productId });

    if (!product) {
      throw new ErrorHandler(404, "Product Not Found");
    }
    if (quantity > product.available) {
      console.log(quantity > product.available, quantity, product.available);
      throw new ErrorHandler(
        400,
        "That much Quantity is not avaiable in stock "
      );
    }

    const updatedCart = await updateQuantity(
      { _id: cartId, user },
      { productId, newQuantity: quantity }
    );

    return res.send(updatedCart);
  } catch (error) {
    next(error);
  }
}

export async function getCartDetailsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cartId = req.query.cart as string;
    const user = res.locals.user._id;

    const cart = await getCartDetails({ _id: cartId, user });
    return res.send(cart);
  } catch (error) {
    next(error);
  }
}
