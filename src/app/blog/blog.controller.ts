import { Request, Response } from 'express';
import { AppRequest } from '../../@types/express';
import BlogService from './blog.service';
import { CreateBlogBody } from './schema/create-blog.validator';
import { UpdateBlogBody } from './schema/update-blog.valdation';


class BlogController {
    private readonly service: BlogService = new BlogService()
    // Create a blog
    async createBlog(req: AppRequest, res: Response): Promise<Response> {
        try {
            console.log({ user: req.user, userId: req.userId });
        //   @ts-ignore
            const body = req.body as CreateBlogBody;
            const blog = await this.service.createBlog({ ...body, author: req.user.name });
            return res.status(201).json(blog);
        } catch (error: any) {
            console.log("error=> ", error)
            return res.status(400).json({ error: error.message });
        }
    }

    // TODO-c: get this filter from query params (?category=abc,xyz)
    // TODO-c: Get all blog with filter. where category is "abc" or "xyz"
    // Get all blogsx
    async getAllBlogs(_: AppRequest, res: Response): Promise<Response> {  // Removed req as it's unused
        try {
             const blogs = await this.service.getAllBlogs();
            return res.status(200).json(blogs);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }


     // Get all blogs with filter by category
     async getBlogsByCategoryFilter(req: Request, res: Response): Promise<Response> {
        try {
            const categoryQuery = req.query.category as string;
            if (!categoryQuery) {
                return res.status(400).json({ error: 'Category filter is required in query parameters.' });
            }

            // Parse category query into an array
            const categories = categoryQuery.split(',');

            // Fetch blogs using the service
            const blogs = await this.service.getBlogsByCategoryFilter(categories);

            if (blogs.length === 0) {
                return res.status(404).json({ message: 'No blogs found for the specified categories.' });
            }

            return res.status(200).json(blogs);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    // Get a single blog by ID
    async getBlogById(req: Request, res: Response): Promise<Response> {
        try {
            const blog = await this.service.getBlogById(req.params.id);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            return res.status(200).json(blog);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }

    // Update a blog by ID
    async updateBlog(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body as UpdateBlogBody;
            const blog = await this.service.updateBlog(req.params.id, body);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            return res.status(200).json(blog);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    // softdelete a blog by ID
    async softdelete(req: Request, res: Response): Promise<Response> {
        try {
            const blog = await this.service.softdelete(req.params.id);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            return res.status(200).json({ message: 'Blog tempary deleted successfully' });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    // restoredelete a blog by ID
    async restoredelete(req: Request, res: Response): Promise<Response> {
        try {
            const blog = await this.service.restoredelete(req.params.id);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            return res.status(200).json({ message: 'Blog restore successfully' });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

        // Get all trash blogsx
        async getalltrash(_: AppRequest, res: Response): Promise<Response> {  // Removed req as it's unused
            try {
                 const blogs = await this.service.getalltrash();
                return res.status(200).json(blogs);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        }
    // Delete a blog by ID
    async deleteBlog(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.service.deleteBlog(req.params.id);
            if (!result) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            return res.status(200).json({ message: 'Blog deleted successfully' });
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }

}

export default BlogController;
