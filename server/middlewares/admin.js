import ErrorHandler from "../utils/errorHandler.js";

const adminMiddleware =
  (...role) =>
  (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new ErrorHandler("Only Admin Allowed", 400));
    }
    next();
  };

export default adminMiddleware;
