import ErrorHandler from '../utils/errorHandler.js';
export const isAuthenticated = (req, res, next) => {
  const token = req.cookies['connect.sid'];

  if (!token) {
    return next(new ErrorHandler('Not Logged In', 401));
  }
  next();
};
