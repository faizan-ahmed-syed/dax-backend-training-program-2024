import Blog, { IBlog } from './Blog.model';

class BlogRepository {
  async create(data: Omit<IBlog, 'createdAt' | 'updatedAt'>): Promise<IBlog> {
    const blog = new Blog(data);
    return await blog.save();
  }

  async findAll(): Promise<IBlog[]> {
    return await Blog.find();
  }

  async findById(id: string): Promise<IBlog | null> {
    return await Blog.findById(id);
  }

  async updateById(id: string, data: Partial<Omit<IBlog, 'createdAt'>>): Promise<IBlog | null> {
    return await Blog.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
  }

  async deleteById(id: string): Promise<IBlog | null> {
    return await Blog.findByIdAndDelete(id);
  }
}

export default new BlogRepository();
