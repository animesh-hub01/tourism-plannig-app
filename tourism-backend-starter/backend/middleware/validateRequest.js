import { validationResult } from 'express-validator';

// Runs after express-validator's checks in a route. If any check failed,
// responds with 400 and the list of validation messages instead of
// letting bad data reach the controller.
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((e) => e.msg).join(', '),
    });
  }
  next();
};

export default validateRequest;
