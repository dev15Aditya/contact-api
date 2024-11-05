import { Request, Response, NextFunction, RequestHandler } from 'express';

export const validateContact: RequestHandler = (
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
  const { name, phoneNumber } = req.body;

  if (!name || !phoneNumber) {
    res.status(400).json({
      status: 400,
      message: 'Name and phone number are required',
    });
  }

  // Basic phone number validation
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!phoneRegex.test(phoneNumber)) {
    res.status(400).json({
      status: 400,
      message: 'Invalid phone number format',
    });
  }

  next();
};