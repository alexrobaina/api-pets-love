import { body, validationResult } from 'express-validator'

// Middleware to validate and sanitize body data for the User model
export const validateAppointments = [
  body('ownerId')
    .optional()
    .isString()
    .withMessage('Owner ID must be a string'),
  body('startDate')
    .optional() // Make optional if not always required
    .isString()
    .withMessage('Start date must be a string'),
  body('endDate')
    .optional() // Make optional if not always required
    .isString()
    .withMessage('End date must be a string'),
  body('petId').optional().isString().withMessage('Pet ID must be a string'),
  body('recipientId')
    .optional()
    .isString()
    .withMessage('Recipient ID must be a string'),
  body('title').isString().withMessage('Title must be a string'),
  body('description').isString().withMessage('Description must be a string'),
  body('recurring')
    .optional()
    .isBoolean()
    .withMessage('Recurrence must be a boolean'),
  body('recurrenceType')
    .optional()
    .isString()
    .withMessage('RecurrenceType must be a string')
    .custom((value) => {
      if (value === null || value === '') return true
      try {
        JSON.parse(value)
      } catch (error) {
        console.error('Invalid recurrenceType:', value)
        throw new Error('Invalid JSON format')
      }
      return true
    }),

  (req: any, res: any, next: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]
