import { v2 as cloudinary } from 'cloudinary';
import ErrorHandler from '../utils/errorHandler.js';
import * as dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: 'dzsohhw5x',
  api_key: 775353772872837,
  api_secret: 'cwAy5CNek09gIqyjfclrFjgm1uE',
});

const uploadOnCloudinary = async (image) => {
  console.log(process.env.CLOUD_API_KEY);
  if (!image) return next(new ErrorHandler('No File Uploaded', 400));

  try {
    const res = await cloudinary.uploader.upload(image, {
      resource_type: 'auto',
      folder: 'KHI',
    });

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default uploadOnCloudinary;
