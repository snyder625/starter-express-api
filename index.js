import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import Stripe from "stripe";

import orderRoute from "./routes/orderRoutes.js";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import { errMiddleware } from "./middleware/error.js";
// import ErrorHandler from "./utils/ErrorHandler.js";

const app = express();
dotenv.config({ path: "./.env" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://admin-rizwan:Test123@cluster0.y5gay.mongodb.net/FoodDeliveryApp?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  const { total } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: total,
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.get("/", async (req, res) => {
  res.send("Hello World!")
});

app.use("/api/v1", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use(errMiddleware);

app.listen(4000, () => {
  connect();
  console.log("App is running on port 4000");
});
