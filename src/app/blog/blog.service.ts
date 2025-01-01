//import { date } from 'zod';
import { IBlog } from './Blog.model';
import BlogRepository from './blog.repository';
import { Types } from 'mongoose';

class BlogService {
    static async createBlog(data: Omit<IBlog, 'createdAt' | 'updatedAt'>): Promise<IBlog> {
        try {
            // BlogRepository.create({ createdAt: new Date() })
            //const blog = new Blog(data);
            return await BlogRepository.create({ data });
        } catch (error: any) {
            throw new Error(error.message || 'Error creating blog');
        }
    }

    static async getAllBlogs(): Promise<IBlog[]> {
        try {
            return await BlogRepository.findAll();
        } catch (error: any) {
            throw new Error(error.message || 'Error creating blog');
        }
    }

    static async getBlogById(id: string | Types.ObjectId): Promise<IBlog> {
        try {
            const blog = await BlogRepository.findById(id);
            if (!blog) throw new Error('Blog not found');
            return blog;
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching blog');
        }
    }

    static async updateBlog(id: string | Types.ObjectId, data: Partial<IBlog>): Promise<IBlog>{
        try {
            const updatedBlog = await BlogRepository.updateById(id, data);
              
            if (!updatedBlog) throw new Error('Blog not found');
            return updatedBlog;
               
        } catch (error: any) {
            throw new Error(error.message || 'Error updating blog');
        }
    }

    static async deleteBlog(id: string | Types.ObjectId): Promise<IBlog> {
        try {
            const deletedBlog = await BlogRepository.deleteById(id);
            if (!deletedBlog) throw new Error('Blog not found');
            return deletedBlog;
        } catch (error: any) {
            throw new Error(error.message || 'Error deleting blog');
        }
    }
}

export default BlogService;
