import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        res.status(401).json({
            error: 'Authentication required'
        });
    }
    const user = jwt.verify(token!, process.env.JWT_SECRET!)
    req.body.userId = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: 'Authentication failed'
    });
    return;
  }
};