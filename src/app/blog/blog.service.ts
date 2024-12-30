import Blog, { IBlog } from './Blog.model'; // Assuming IBlog is the interface for a Blog document
import BlogRepository from './blog.repository';

interface BlogData {
    title: string;
    content: string;
    author: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class BlogService {
    static async createBlog(data: BlogData): Promise<IBlog> {
        try {
            const blog = new Blog(data);
            return await blog.save();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getAllBlogs(): Promise<IBlog[]> {
        try {
            return await Blog.find();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getBlogById(id: string): Promise<IBlog | null> {
        try {
            const blog = await Blog.findById(id);
            if (!blog) throw new Error('Blog not found');
            return blog;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async updateBlog(id: string, data: BlogData): Promise<IBlog | null> {
        try {
            const updatedBlog = await Blog.findByIdAndUpdate(
                id,
                { ...data, updatedAt: Date.now() },
                { new: true, runValidators: true }
            );
            if (!updatedBlog) throw new Error('Blog not found');
            return updatedBlog;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async deleteBlog(id: string): Promise<IBlog | null> {
        try {
            const deletedBlog = await Blog.findByIdAndDelete(id);
            if (!deletedBlog) throw new Error('Blog not found');
            return deletedBlog;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
export default BlogService;