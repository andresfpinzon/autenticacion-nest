/* eslint-disable prettier/prettier */
import { IsEmpty, IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Categoria, IBook } from '../interface/book.interface';
import { User } from 'src/modules/auth/schema/auth.schema';

export class CreateDtoBook implements IBook {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  autor: string;

  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsEnum({ Categoria })
  categoria: Categoria;

  @IsEmpty({ message: 'You can not pass user id' })
  user: User;
}