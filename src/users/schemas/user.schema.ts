
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  dateOfBirth: Date

  @Prop({default: "LOCAL"})
  accountType: string;

  @Prop({default: false})
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
