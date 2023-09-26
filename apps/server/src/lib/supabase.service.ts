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

    console.log(this.request.headers.authorization);

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

  public async uploadToStorage(
    bucketName: string,
    filePath: string,
    file: any,
  ) {
    const { data, error } = await this.getClient()
      .storage.from(bucketName)
      .upload(filePath, file);

    if (error) throw new InternalServerErrorException('upload failed');

    return data.path;
  }
}
