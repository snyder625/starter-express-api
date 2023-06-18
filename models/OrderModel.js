import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: "string",
      required: true,
      maxLength: 60,
    },
    userId: {
      type: "string",
      required: true,
    },
    address: {
      type: "string",
      required: true,
      maxLength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
      max: 3,
    },
    method: {
      type: Number,
      required: true,
    },

    isTokenized: {
      type: Boolean,
      default: false,
    },
    walletAddress: {
      type: "string",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
