import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Middleware for validating the request body using a Zod schema.
 * @param schema - The Zod schema to validate the request body against.
 * @returns Middleware function for Express.
 */
const validateBody = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            // Validate the request body
            schema.parse(req.body);
            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            // Handle validation errors
            if (err instanceof ZodError) {
                res.status(400).json({
                    error: 'Validation Error',
                    details: err.errors, // Zod provides an array of error details
                });
            } else {
                next(err);
            }
        }
    };
};

export default validateBody;
