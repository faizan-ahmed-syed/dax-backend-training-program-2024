import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save({
      slug: createCategoryDto.title,
      title: createCategoryDto.title,
    });
  }

  findAll() {
    return this.categoryRepository.find({});
  }

  findTrash() {
    return this.categoryRepository.find({ withDeleted: true });
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(
      { id },
      { title: updateCategoryDto.title, slug: updateCategoryDto.title },
    );
  }

  delete(id: number, type: 'soft' | 'hard') {
    if (type === 'hard') {
      return this.categoryRepository.delete({ id });
    } else {
      return this.categoryRepository.softDelete({ id });
    }
  }

  restore(id: number) {
    return this.categoryRepository.restore({ id });
  }
}
