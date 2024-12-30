import { Request, Response } from 'express';
import BlogService from './blog.service';
import { IBlog } from './Blog.model';

class BlogController {
    static async createBlog(req: Request, res: Response): Promise<void> {
        try {
            const blog: IBlog = await BlogService.createBlog(req.body);
            res.status(201).json(blog);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    static async getAllBlogs(req: Request, res: Response): Promise<void> {
        console.log('====================================');
        console.log(process.env.MONGODB_URI);
        console.log('====================================');
        try {
            const blogs: IBlog[] = await BlogService.getAllBlogs();
            res.status(200).json(blogs);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    static async getBlogById(req: Request, res: Response): Promise<void> {
        try {
            const blog: IBlog | null = await BlogService.getBlogById(req.params.id);
            res.status(200).json(blog);
        } catch (error) {
            res.status(404).json({ error: (error as Error).message });
        }
    }

    static async updateBlog(req: Request, res: Response): Promise<void> {
        try {
            const blog: IBlog | null = await BlogService.updateBlog(req.params.id, req.body);
            res.status(200).json(blog);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    static async deleteBlog(req: Request, res: Response): Promise<void> {
        try {
            await BlogService.deleteBlog(req.params.id);
            res.status(200).json({ message: 'Blog deleted successfully' });
        } catch (error) {
            res.status(404).json({ error: (error as Error).message });
        }
    }
}

export default BlogController;
