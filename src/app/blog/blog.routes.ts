import { Router, Request, Response, NextFunction } from 'express';
import { authentication } from '../../shared/middleware/authentication';
import validateBody from '../../shared/middleware/validateBody';
import BlogController from './blog.controller';
import { updateBlogSchema } from './schema/update-blog.valdation';
// import { authorization } from '../../shared/middleware/authorization';

// TODO-C: your-name/feature/soft-delete-blog
// TODO-C: Soft delete API
// TODO-C: Hard delete API
// TODO-C: Restore delete data API
// TODO-C: Get all trash data API

export class BlogRoutes {
  readonly router: Router = Router();
  private controller = new BlogController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    console.log("Blog Routes initialized!");

    // Create a blog
    this.router.post(
      '/',
      // Authentication
      // Authrization,
      authentication,
      // authorization(['author', "admin"]),
      // validateBody(createBlogSchema),

      // blogController.createBlog,

      // BlogController.createBlog,
      
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          //   @ts-ignore
          await this.controller.createBlog(req, res);
        } catch (err) {
          next(err);
        }
      }
    );

    // Get all blogs
    this.router.get(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          //   @ts-ignore
          await this.controller.getAllBlogs(req, res);
        } catch (err) {
          next(err);
        }
      }
    );

    // Get all blogs
    this.router.get(
      '/trash',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          //   @ts-ignore
          await this.controller.getalltrash(req, res);
        } catch (err) {
          next(err);
        }
      }
    );

    // Get blogs with category filter
    this.router.get(
      '/filter',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await this.controller.getBlogsByCategoryFilter(req, res);
        } catch (err) {
          next(err);
        }
      }
    );

    // Get a single blog by ID
    this.router.get(
      '/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await this.controller.getBlogById(req, res);
        } catch (err) {
          next(err);
        }
      }
    );

    // Update a blog by ID
    this.router.put(
      '/:id',
      validateBody(updateBlogSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await this.controller.updateBlog(req, res);
        } catch (err) {
          next(err);
        }
      }
    );


    // Soft delete a blog by ID
    this.router.put(
      '/delete/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await this.controller.softdelete(req, res);
        } catch (err) {
          next(err);
        }
      }
    );

      // restore delete a blog by ID
      this.router.put(
        '/restore/:id',
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            await this.controller.restoredelete(req, res);
          } catch (err) {
            next(err);
          }
        }
        );


    // Delete a blog by ID
    this.router.delete(
      '/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await this.controller.deleteBlog(req, res);
        } catch (err) {
          next(err);
        }
      }
    );

    
  }
}

