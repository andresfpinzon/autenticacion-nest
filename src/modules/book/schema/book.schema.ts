/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IBook, Categoria } from '../interface/book.interface';
import { User } from 'src/modules/auth/schema/auth.schema';

@Schema({ timestamps: true })
export class Book extends Document implements IBook {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  autor: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  categoria: Categoria;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);