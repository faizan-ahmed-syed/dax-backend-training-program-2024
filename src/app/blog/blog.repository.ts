import { promises } from 'dns';
import Blog, { IBlog } from './Blog.model';
import { Types, Document } from 'mongoose';

class BlogRepository {

   /**
     * Creates a new blog entry in the database.
     * @param data - Blog data without createdAt and updatedAt fields.
     * @returns The newly created blog document.
     */
  async create({ data }: { data: Omit<IBlog, 'createdAt' | 'updatedAt'>; }): Promise<IBlog & Document> {
    const blog = new Blog(data);
    return await blog.save();
  }

    /**
     * Fetches all blogs from the database.
     * @returns An array of blog documents.
     */

  async findAll(): Promise<(IBlog & Document)[]>  {
    return await Blog.find();
  }


    /**
     * Fetches a single blog by its ID.
     * @param id - The ID of the blog to retrieve.
     * @returns The blog document if found, otherwise null.
     */

  async findById(id: string | Types.ObjectId): Promise<IBlog & Document | null> {
    return await Blog.findById(id);
  }


   /**
     * Updates a blog by its ID.
     * @param id - The ID of the blog to update.
     * @param data - Partial blog data to update.
     * @returns The updated blog document if found, otherwise null.
     */

  async updateById( id: string | Types.ObjectId, data: Partial<IBlog>): Promise<IBlog & Document | null> {
    return await Blog.findByIdAndUpdate(
      id,
      { ...data, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
  }

   /**
     * Deletes a blog by its ID.
     * @param id - The ID of the blog to delete.
     * @returns The deleted blog document if found, otherwise null.
     */
    
  async deleteById(id: string | Types.ObjectId): Promise<IBlog & Document | null> {
    return await Blog.findByIdAndDelete(id);
  }
}

export default new BlogRepository();
