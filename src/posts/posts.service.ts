import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)  // Inject the Post repository into the service
    private postsRepository: Repository<Post>,
  ) {}

  // Create a new post
  async create(post: Post): Promise<Post> {
    return await this.postsRepository.save(post);
  }

  // Find all posts
  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  // Find a post by its ID
  async findOne(id: number): Promise<Post> {
    return await this.postsRepository.findOne(id);
  }

  // Update a post by its ID
  async update(id: number, post: Post): Promise<Post> {
    await this.postsRepository.update(id, post);
    return this.findOne(id);  // Return the updated post
  }

  // Delete a post by its ID
  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
