import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UniqueEmailConstraint } from './validators/unique-email.decorator'; // Adjust path
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const schema = UserSchema;
          schema.add({
            accountType: {
              type: String,
              default: configService.get<string>('ACCOUNT_TYPE'),
            }
          });
          return schema;
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UniqueEmailConstraint], // Register validator
  exports: [UsersService, UniqueEmailConstraint], // Export if needed
})
export class UsersModule {}
