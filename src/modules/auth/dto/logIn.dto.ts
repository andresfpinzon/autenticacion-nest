/* eslint-disable prettier/prettier */
// Importa la interfaz IUser para implementar su estructura
import { IUser } from '../interface/user.interface';
// Importa decoradores de validación de class-validator
import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

// Clase LogInDto que implementa la interfaz IUser
export class LogInDto implements IUser {
  // Propiedad 'name', opcional para permitir que sea undefined
  @IsOptional() // Permite que esta propiedad sea opcional
  @IsString() // Asegura que sea una cadena
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' }) // Mensaje personalizado si está vacío
  name: string;

  // Propiedad 'email', también opcional
  @IsOptional() // Permite que esta propiedad sea opcional
  @IsEmail({}, { message: 'Formato de email inválido.' }) // Valida el formato del email y proporciona un mensaje personalizado
  @IsNotEmpty({ message: 'El email no puede estar vacío.' }) // Mensaje personalizado si está vacío
  email: string;

  // Propiedad 'password', opcional y con validaciones adicionales
  @IsOptional() // Permite que esta propiedad sea opcional
  @IsString() // Asegura que sea una cadena
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' }) // Mensaje personalizado si está vacía
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }) // Valida que la contraseña tenga al menos 6 caracteres
  password: string;
}