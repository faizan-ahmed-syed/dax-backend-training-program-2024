import { blogRepoLogger } from '../../shared/logger';
import Blog, { IBlog } from './Blog.model';

type BlogRepoData = Pick<IBlog, 'title' | 'content' | 'author' | 'categoryId'>;

interface UpdatedRepoData {
  title?: string | undefined;
  content?: string | undefined;
  author?: string | undefined;
}

class BlogRepository {
  // Create a new blog post
   async create(data: BlogRepoData): Promise<IBlog> {
    blogRepoLogger.info('Creating a new blog post:', data);
    const blog = new Blog(data);
    return await blog.save();
  }

  // Find all blog posts
   async findAll(): Promise<IBlog[]> {
    return await Blog.find();
  }

   // Get all blogs with a filter by category
    async findByCategoryFilter(categories: string): Promise<IBlog[]> {
    return await Blog.find({
      categoryId: { $in: categories },
    }).exec();
  }
  
  // Find a blog post by its ID
   async findById(id: string): Promise<IBlog | null> {
    return await Blog.findById(id);
  }


  // Update a blog post by its ID
   async updateById(id: string, data: UpdatedRepoData): Promise<IBlog | null> {
    return await Blog.findByIdAndUpdate(
      id,
      { ...data, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
  }

  // softdelete a blog post by its ID
   async softdelete(id: string): Promise<IBlog | null> {
    return await Blog.findByIdAndUpdate(
      id,
      { deletedAt: Date.now() },
      { new: true, runValidators: true }
    );
  }

  // restoredelete a blog post by its ID
   async restoredelete(id: string): Promise<IBlog | null> {
    return await Blog.findByIdAndUpdate(
      id,
      { deletedAt: null },
      { new: true, runValidators: true }
    );
  }

  // filter by trash a blog post by its ID
   async getalltrash(): Promise<IBlog[]> {
    return await Blog.find(
      {deletedAt:{$not:{$eq:null}}}
    );
  }

  // Delete a blog post by its ID
   async deleteById(id: string): Promise<IBlog | null> {
    return await Blog.findByIdAndDelete(id);
  }

  // Find blog posts by category with pagination
}

export default BlogRepository;
