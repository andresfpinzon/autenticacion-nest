/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/auth.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/singUp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dto/logIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  
  /**
 * Método de registro para el usuario.
 */

async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { password, ...userData } = signUpDto;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      // Crear una nueva instancia de usuario
      const newUser = await this.userModel.create({
        ...userData,
        password: hashedPassword,
      });
  
      const token = this.jwtService.sign({
        id: newUser.id,
        name: newUser.name,
      });
  
      return { token };
    } catch (error) {
      // Manejo de errores
      throw new UnauthorizedException(
        'Error al registrar el usuario. Inténtalo de nuevo.',
      );
    }
  }


  /**
 * Método de inicio de sesión para el usuario.
 */
async logIn(logInDto: LogInDto): Promise<{ token: string }> {
    const { email, password } = logInDto;
  
    const user = await this.userModel.findOne({ email }).exec();
  
    if (!user) {
      throw new UnauthorizedException('Email o contraseña inválidos.');
    }
  
    const isPasswordMatched = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Email o contraseña inválidos.');
    }
  
    const payload = { id: user.id, name: user.name };
    const token = this.jwtService.sign(payload);
    // Asegúrate de que el secreto esté configurado en JwtModule
  
    return { token };
  }
  
}