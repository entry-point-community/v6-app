import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  @Transform(({ value }) => value.toString().toLowerCase())
  readonly email: string;

  @IsString()
  readonly password: string;
}
