import { asyncCatchError } from '../middlewares/error.js';
import ErrorHandler from '../utils/errorHandler.js';
import uploadOnCloudinary from '../config/cloudinaryConfig.js';
import Item from '../models/item.model.js';

export const createItem = asyncCatchError(async (req, res, next) => {
  const { title, description, price } = req.body.additem;

  const response = await uploadOnCloudinary(req.body.image);

  const image = {
    public_id: response.public_id,
    url: response.url,
  };

  const newitem = await Item.create({ title, description, price, image });

  res.status(200).json({ hello: true, newitem });
});

export const getAllItems = asyncCatchError(async (req, res, next) => {
  const items = await Item.find();

  res.status(200).json({ success: true, items });
});

export const getItemDetails = asyncCatchError(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(new ErrorHandler('Item Not Found', 400));
  }

  res.status(200).json({ success: true, item });
});

export const updateRating = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    console.log(req.params.rating);

    if (req.params.rating === undefined || req.params.rating === null) {
      req.params.rating = 1;
    }
    console.log(req.params.rating, 34);

    if (!item) {
      return next(new ErrorHandler('Item Not Found', 400));
    }

    const rating = item.rating.find((rate) => {
      return rate.user._id.toString() === req.user._id.toString();
    });

    if (rating) {
      item.rating.forEach((i) => {
        if (i.user._id.toString() === req.user._id.toString()) {
          i.rate = req.params.rating;
        }
      });
    } else {
      item.rating.push({ rate: req.params.rating, user: req.user._id });
    }

    let overallRating = 0;

    item.rating.forEach((i) => {
      overallRating += i.rate;
    });

    item.overAllRating = overallRating / item.rating.length;

    await item.save();
    res.status(200).json({ success: true, message: 'Thanks For Rating' });
  } catch (error) {
    console.log(error);
  }
};
