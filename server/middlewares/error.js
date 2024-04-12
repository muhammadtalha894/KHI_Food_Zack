const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const asyncCatchError = (passfunction) => (req, res, next) => {
  Promise.resolve(passfunction(req, res, next)).catch(next);
};

export default errorMiddleware;
