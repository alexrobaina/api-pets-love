import  { body, validationResult } from 'express-validator'

// Middleware to validate and sanitize body data for the User model
export const validateAndSanitizeUser = [
  body('email').isEmail().withMessage('Provide a valid email address').normalizeEmail(),
  body('firstName').optional().trim().escape(),
  body('lastName').optional().trim().escape(),
  body('username').optional().trim().escape(),
  body('description').optional().trim().escape(),
  body('image').optional().trim().escape().isURL().withMessage('Image must be a valid URL'),
  body('locationId').optional().trim().escape(),
  body('socialMedia').optional().custom(value => {
    if (value === null) return true; // Allow null values explicitly
    try {
      JSON.parse(value);
    } catch (error) {
      throw new Error('socialMedia must be a valid JSON string');
    }
    return true;
  }),

  (req: any, res: any, next: any) => {
    console.log('Received data:', req.body); // Debug output to see what is received
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
