import express from 'express';
import adminMiddleware from '../middlewares/admin.js';
import { isAuthenticated } from '../middlewares/auth.js';
import {
  createItem,
  getAllItems,
  getItemDetails,
  updateRating,
} from '../controllers/itemController.js';

const itemRoute = express.Router();

itemRoute.post(
  '/additem',
  isAuthenticated,
  adminMiddleware('admin'),
  createItem,
);

itemRoute.get('/update/rating/:id/:rating', isAuthenticated, updateRating);
itemRoute.get('/getitems', getAllItems);

itemRoute.get('/getitemdetails/:id', getItemDetails);

export default itemRoute;
