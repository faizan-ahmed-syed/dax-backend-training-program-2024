import Blog, { IBlog } from './Blog.model';
import BlogRepository from './blog.repository'

class BlogService {
    static async createBlog(data: Omit<IBlog, 'createdAt' | 'updatedAt'>): Promise<IBlog> {
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

    static async updateBlog(id: string, data: Partial<Omit<IBlog, 'createdAt'>>): Promise<IBlog | null> {
        try {
            const updatedBlog = await Blog.findByIdAndUpdate(
                id,
                { ...data, updatedAt: new Date() },
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
