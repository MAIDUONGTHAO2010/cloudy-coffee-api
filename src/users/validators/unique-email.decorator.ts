import { Injectable, Logger } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmailConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    return this.userService.isEmailUnique(email);
  }

  defaultMessage(): string {
    return 'Email is already in use';
  }
}
