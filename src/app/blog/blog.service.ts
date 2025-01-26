import { blogServiceLogger } from '../../shared/logger';


import { IBlog } from './Blog.model';
import BlogRepository from './blog.repository';
import CategoryRepository from "../categories/categories.repository";
import { CreateBlogBody } from './schema/create-blog.validator';
import { UpdateBlogBody } from './schema/update-blog.valdation';

class BlogService {
  private readonly repository: BlogRepository = new BlogRepository()
  // Create a blog
  async createBlog(data: CreateBlogBody): Promise<IBlog> {
    try {
      return await this.repository.create(data);
    } catch (error: unknown) {
      blogServiceLogger.error('Error creating blog:', error);
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }

    }
  }

    // Get all blogs
    async getAllBlogs(): Promise<IBlog[]> {
      try {
        return await this.repository.findAll();
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('An unknown error occurred');
        }
      }
    }

    // Get all blogs with filter by category
    async getBlogsByCategoryFilter(categories: string[]): Promise<IBlog[]> {
      try {
        console.log('categories:', categories[0]);
        const category = await CategoryRepository.findByname(categories[0]);
        if(!category) 
        {
          throw new Error('Category not found');
        }
        return await this.repository.findByCategoryFilter(category._id as string);
      } catch (error: unknown) {
        blogServiceLogger.error('Error fetching blogs with category filter:', error);
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('An unknown error occurred');
        }
      }
    }  

  // Get a single blog by ID
  async getBlogById(id: string): Promise<IBlog | null> {
    try {
      const blog = await this.repository.findById(id);
      if (!blog) throw new Error('Blog not found');
      return blog;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }


  // Update a blog by ID
  async updateBlog(id: string, data: UpdateBlogBody): Promise<IBlog | null> {
    try {
      const updatedBlog = await this.repository.updateById(id, data);
      if (!updatedBlog) throw new Error('Blog not found');
      return updatedBlog;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

     // Get all trash blogs
     async getalltrash(): Promise<IBlog[]> {
      try {
        return await this.repository.getalltrash();
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('An unknown error occurred');
        }
      }
    }


  // softdelete a blog by ID
  async softdelete(id: string): Promise<IBlog | null> {
    try {
      const  isDeleted = await this.repository.findById(id);
      if (isDeleted?.deletedAt  !== null) {
        throw new Error('Already deleted');
      }else{
      const softdeletblog = await this.repository.softdelete(id);
      if (!softdeletblog) throw new Error('Blog not found');
      return softdeletblog;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  // restore a blog by ID
  async restoredelete(id: string): Promise<IBlog | null> {
    try {
      const  isDeleted = await this.repository.findById(id);
      if (isDeleted?.deletedAt  !== null) {
      const deletedBlog = await this.repository.restoredelete(id);
      if (!deletedBlog) throw new Error('Blog not found');
      return deletedBlog;
    }else{
      throw new Error('Blog has to be soft deleted first');
    }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
  
  // Delete a blog by ID
  async deleteBlog(id: string): Promise<IBlog | null> {
    try {
      const  isDeleted = await this.repository.findById(id);
      if (isDeleted?.deletedAt  !== null) {
      const deletedBlog = await this.repository.deleteById(id);
      if (!deletedBlog) throw new Error('Blog not found');
      return deletedBlog;
    }else{
      throw new Error('Blog has to be soft deleted first');
    }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }


}

export default BlogService;
