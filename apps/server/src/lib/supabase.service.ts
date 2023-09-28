import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

import { config } from '~/config';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private clientInstance: SupabaseClient;

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public getClient() {
    if (this.clientInstance) {
      return this.clientInstance;
    }

    this.clientInstance = createClient(config.supabaseUrl, config.supabaseKey, {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${ExtractJwt.fromAuthHeaderAsBearerToken()(
            this.request,
          )}`,
        },
      },
    });

    return this.clientInstance;
  }

  private extractFileExtension(mimetype: string) {
    return mimetype.split('/')[1];
  }

  public async uploadToPublicStorage(
    bucketName: string,
    file: Express.Multer.File,
    fileName?: string,
  ) {
    const fileExtension = this.extractFileExtension(file.mimetype);
    const filePath = `${new Date().getTime()}-${
      fileName || ''
    }.${fileExtension}`;

    const { data, error } = await this.getClient()
      .storage.from(bucketName)
      .upload(filePath, file.buffer);

    if (error)
      throw new InternalServerErrorException('upload failed: ' + error.message);

    const uploadedFilePublicUrl = this.getClient()
      .storage.from(bucketName)
      .getPublicUrl(data.path);

    return uploadedFilePublicUrl.data.publicUrl;
  }
}
