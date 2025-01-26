// import { createClient } from 'redis';
import { AccessRoutes } from './app/rbac/access.routes';
import mongoose from 'mongoose';
import express, { Request, Response, NextFunction, Express } from 'express';
import { config } from 'dotenv';
import {CategoryRoutes} from "./app/categories/categories.routes"
import * as z from 'zod';
import { logger } from './shared/logger';
import { BlogRoutes } from './app/blog/blog.routes';
import { createClient } from 'redis';

config(); // Load environment variables

const app: Express = express();

// Environment variables validation schema
const envValidatorSchema = z.object({
    MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
    APP_PORT: z.string().min(1, "APP_PORT is required"),
    PRIVATE_KEY: z.string().min(1, "PRIVATE_KEY is required"),
});

async function main() {
    try {
        const client = createClient({
            username: process.env.REDIS_USERNAME || 'default',
            password: process.env.REDIS_PASSWORD || '',
            socket: {
                host: 'redis-15018.c12.us-east-1-4.ec2.redns.redis-cloud.com',
                port: 15018
            }
        });
        
        client.on('error', err => console.log('Redis Client Error', err));
        
        await client.connect();
        logger.info('Connected to redis');
        await client.set('foo', 'bar');
        const result = await client.get('foo');
        console.log(result)  // >>> bar
        
        // // Connect to Redis
        // await client.connect();

        // throw new Error('Error initializing application');
        // Validate environment variables
        const env = envValidatorSchema.parse(process.env);

        // Connect to MongoDB
        await mongoose.connect(env.MONGODB_URI);
        logger.info('Connected to MongoDB');
    } catch (error) {
        console.log({ error });
        logger.error('Error initializing application:', error);
        process.exit(1); // Exit the process if the connection fails
    }
}

main();

// Middleware to parse JSON requests
app.use(express.json());

// Modular Routes
app.use('/blogs', new BlogRoutes().router);
app.use('/category', new CategoryRoutes().router);
app.use('/users', new AccessRoutes().router)

// Global Error Handling Middleware
app.use((err: any, _req: Request, _res: Response, _next: NextFunction) => {
    logger.error('Error occurred:', err.stack || err.message);
    _res.status(500).json({
        message: 'Something went wrong!',
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Only expose stack trace in development
    });
});

// Start the server
const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
``