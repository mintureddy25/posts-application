import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Create a new post
  @Post()
  create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postsService.create(post);
  }

  // Get all posts
  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  // Get a post by its ID
  @Get(':id')
  findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  // Update a post
  @Put(':id')
  update(@Param('id') id: number, @Body() post: PostEntity): Promise<PostEntity> {
    return this.postsService.update(id, post);
  }

  // Delete a post
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.postsService.remove(id);
  }
}
