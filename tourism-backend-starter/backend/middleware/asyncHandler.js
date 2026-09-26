// Wraps an async route handler so any thrown error / rejected promise
// is automatically forwarded to Express's error-handling middleware,
// instead of needing try/catch in every single controller function.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
