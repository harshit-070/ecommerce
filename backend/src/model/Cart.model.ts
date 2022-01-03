import { Schema, model } from "mongoose";
import { ICart } from "../interface/Cart.interface";

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  isOrdered: { type: Boolean, required: true, default: false },
});

const CartModel = model<ICart>("Cart", CartSchema);

export default CartModel;
