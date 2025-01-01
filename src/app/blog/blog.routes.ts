import express,{ Request, Response, NextFunction } from 'express';
import BlogController from './blog.controller';
import validateBody from '../../shared/middlwear/validateBody';
import { createBlogSchema } from './schema/create-blog.validator';
import {any, z} from 'zod';

// Define Zod schema for validating route parameters
const idParamSchema = z.object({
    id: z.string().uuid("Invalid ID format"), // Validate that the ID is a valid UUID
});

const router = express.Router();

// Middleware for validating params
const validateParamsMiddleware = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next:Function): void => {
        try {
            schema.parse(req.params); // Validate params using the schema
            next();
        } catch (err) {
            if (err instanceof z.ZodError) {
                res.status(400).json({
                    error: 'Validation Error',
                    details: err.errors, // Provide detailed error information
                });
            } else {
                next(err);
            }
        }
    };
};

// Create a blog
router.post('/', validateBody(createBlogSchema), BlogController.createBlog);

// Get all blogs
router.get('/', BlogController.getAllBlogs);

// Get a single blog by ID with Zod validation
router.get('/:id',validateParamsMiddleware(idParamSchema), BlogController.getBlogById);

// Update a blog by ID with Zod validation
router.put('/:id',validateParamsMiddleware(idParamSchema), validateBody(createBlogSchema), BlogController.updateBlog);

// Delete a blog by ID with Zod validation
router.delete('/:id',validateParamsMiddleware(idParamSchema), BlogController.deleteBlog);

export default router;
