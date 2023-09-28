import { Injectable } from '@nestjs/common';
import { Prisma } from '@v6/db';
import { CreatePostDTO } from '@v6/dto';

import { PrismaService } from '~/lib/prisma.service';
import { SupabaseService } from '~/lib/supabase.service';
import { AuthUser } from '../auth/types';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  public async getPosts() {
    const posts = await this.prismaService.post.findMany({
      include: {
        author: true,
      },
    });

    return posts;
  }

  public async createPost(
    createPostInput: CreatePostDTO,
    user: AuthUser,
    file?: Express.Multer.File,
  ) {
    const { body } = createPostInput;

    const prismaPostCreateInput: Prisma.PostCreateInput = {
      body,
      author: {
        connect: {
          userId: user.sub,
        },
      },
    };

    if (file) {
      const uploadedFile = await this.supabaseService.uploadToPublicStorage(
        'post_media',
        file,
      );

      prismaPostCreateInput.mediaUrl = uploadedFile;
    }

    const newPost = await this.prismaService.post.create({
      data: prismaPostCreateInput,
    });

    return newPost;
  }
}
