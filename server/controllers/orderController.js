import Order from '../models/order.model.js';
import { asyncCatchError } from '../middlewares/error.js';
import ErrorHandler from '../utils/errorHandler.js';

//Placed Order COD

export const placedOrder = asyncCatchError(async (req, res, next) => {
  const { details, cart, city } = req.body;

  const shippingInfo = {
    hNo: details.hNO,
    area: details.area,
    city: city,
    postalCode: details.pCode,
    phone: details.pNo,
  };
  let subTotal = 0;
  const orderItems = [];
  cart.forEach((i) => {
    orderItems.push({ item: i.title, price: i.price, quantity: i.quantity });
    subTotal += i.price;
  });

  const user = req.user._id;
  const deliveryCharges = cart.length * 100;
  const totalAmount = Math.round(
    subTotal + deliveryCharges - ((subTotal + deliveryCharges) * 5) / 100,
  );

  const orderOptions = {
    shippingInfo,
    orderItems,
    user,
    subTotal,
    deliveryCharges,
    totalAmount,
  };

  const order = await Order.create(orderOptions);

  res.status(201).json({
    success: true,
    message: 'Order Placed Successfully via Cash On Delivery ',
  });
});

//Get all Orders Of user

export const getMyOrders = asyncCatchError(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id }).populate(
    'user',
    'name',
  );

  res.status(200).json({ success: true, order });
});

//Get single order details

export const getOrderDetails = asyncCatchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name');

  if (!order) return next(new ErrorHandler('Order Not Found', 404));

  res.status(200).json({ success: true, order });
});

// Update Status -- Admin

export const updateOrderStatus = asyncCatchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler('Order Not Found', 404));

  if (order.orderStatus === 'Preparing') order.orderStatus = 'Shipping';
  else if (order.orderStatus === 'Shipping') {
    order.orderStatus = 'Delivered';
    order.deliveredAt = Date.now();
  } else if ((order.orderStatus = 'Delivered')) {
    return next(new ErrorHandler('Food Already Delivered', 400));
  }

  await order.save();

  res.json({ success: true, message: 'Status Updated Successfully' });
});

// Get All Orders --  Admin

export const getAdminOrders = asyncCatchError(async (req, res, next) => {
  const orders = await Order.find().populate('user', 'name');

  res.status(200).json({ success: true, orders });
});

export const getSingleOrder = (req, res, next) => {};
export const deleteOrder = (req, res, next) => {};
