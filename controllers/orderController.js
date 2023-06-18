import Order from "../models/OrderModel.js";

//Get order by specific order ID
export const getOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Place an order
export const postOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get all orders, for admin dashboard
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get all orders, for admin dashboard for rewarding
export const getAllOrdersToBeRewarded = async (req, res) => {
  try {
    const orders = await Order.find({
      total: { $gte: 4000 },
      isTokenized: false,
      walletAddress: { $ne: "" },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get orders by user id
export const getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//update order to be rewarded
export const updateOrderToBeRewarded = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};
