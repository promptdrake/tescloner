function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`404 Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    status: false,
    code: statusCode,
    author: process.env.AUTHOR,
    message: err.message,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
