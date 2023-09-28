import { IsString } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  readonly body: string;
}
