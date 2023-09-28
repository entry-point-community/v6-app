import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDTO } from '@v6/dto';

import { User } from '~/core/auth/user.decorator';
import { SupabaseGuard } from '../auth/supabase/supabase.guard';
import { AuthUser } from '../auth/types';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public async getPosts() {
    const posts = await this.postService.getPosts();

    return posts;
  }

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('post-media'))
  @UseGuards(SupabaseGuard)
  public async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePostDTO,
    @User() user: AuthUser,
  ) {
    const post = await this.postService.createPost(body, user, file);

    return post;
  }
}
