import { asyncCatchError } from '../middlewares/error.js';
import User from '../models/user.model.js';
import Order from '../models/order.model.js';
import nodemailer from 'nodemailer';

//Get User Profile

export const profile = (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
};

// Logout User

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged Out' });
  });
};

// Get All Users -- Admin

export const getAdminUsers = asyncCatchError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

//Send Email

export const sendEmail = asyncCatchError(async (req, res, next) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.email.com',
    port: 465,
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASS,
    },
  });

  const options = {
    from: process.env.SMPT_MAIL,
    to: 'talhatam178@gmail.com',
    subject: 'KHI Food Zack',
    text: `Hello, I am ${name} and my email is ${email}:-\n\n ${message}`,
  };

  await transporter.sendMail(options);
  res.status(200).json({ success: true });
});

// --Admin Stats

export const getAdminStats = asyncCatchError(async (req, res, next) => {
  const usersCount = await User.countDocuments();
  const orders = await Order.find({});

  const preparingOrders = orders.filter((i) => i.orderStatus === 'Preparing');
  const shippingOrders = orders.filter((i) => i.orderStatus === 'Shipping');
  const deliveredOrders = orders.filter((i) => i.orderStatus === 'Delivered');

  let totalIncome = 0;

  orders.forEach((i) => {
    totalIncome += i.totalAmount;
  });

  res.status(200).json({
    success: true,
    usersCount,
    ordersCount: {
      total: orders.length,
      preparing: preparingOrders.length,
      shipping: shippingOrders.length,
      delivered: deliveredOrders.length,
    },
    totalIncome,
  });
});
