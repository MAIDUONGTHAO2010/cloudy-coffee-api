import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { UniqueEmailConstraint } from '../validators/unique-email.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Validate(UniqueEmailConstraint)
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;
}
