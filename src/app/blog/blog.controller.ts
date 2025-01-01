import { Request, Response } from 'express';
import BlogService from './blog.service';

class BlogController {
    static async createBlog(req:Request, res:Response) {
        try {
            const blog = await BlogService.createBlog(req.body);
            res.status(201).json(blog);
        } catch (error:any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllBlogs(req:Request, res:Response) {
        console.log('====================================');
        console.log(process.env.MONGODB_URI);
        console.log('====================================');
        try {
            const blogs = await BlogService.getAllBlogs();
            res.status(200).json(blogs);
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getBlogById(req:Request, res:Response) {
        try {
            const blog = await BlogService.getBlogById(req.params.id);
            res.status(200).json(blog);
        } catch (error:any) {
            res.status(404).json({ error: error.message });
        }
    }

    static async updateBlog(req: Request, res: Response) {
        try {
            const blog = await BlogService.updateBlog(req.params.id,req.body);
            res.status(200).json(blog);
        } catch (error:any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteBlog(req:Request, res:Response) {
        try {
            await BlogService.deleteBlog(req.params.id);
            res.status(200).json({ message: 'Blog deleted successfully' });
        } catch (error:any) {
            res.status(404).json({ error: error.message });
        }
    }
}

export default BlogController;
