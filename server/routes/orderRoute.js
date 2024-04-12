import express from 'express';
import adminMiddleware from '../middlewares/admin.js';
import { isAuthenticated } from '../middlewares/auth.js';
import {
  placedOrder,
  getMyOrders,
  getOrderDetails,
  updateOrderStatus,
  getAdminOrders,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/createorder', isAuthenticated, placedOrder);
orderRouter.get('/myorders', isAuthenticated, getMyOrders);
orderRouter.get('/order/:id', isAuthenticated, getOrderDetails);

//Admin Routes
orderRouter.get(
  '/admin/orders',
  isAuthenticated,
  adminMiddleware('admin'),
  getAdminOrders,
);
orderRouter.get(
  '/admin/order/:id',
  isAuthenticated,
  adminMiddleware('admin'),
  updateOrderStatus,
);
orderRouter.delete('/', isAuthenticated);

export default orderRouter;
