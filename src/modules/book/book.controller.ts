/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    UploadedFiles,
    UseInterceptors,
    UseGuards,
  } from '@nestjs/common';
  import { BookService } from './book.service';
  import { Book } from './schema/book.schema';
  import { CreateDtoBook } from './dto/create-book.dto';
  import { AuthGuard } from '@nestjs/passport';
  import { Roles } from '../auth/decorators/role.decorator';
  import { ERole } from '../auth/enum/role.enum';
  import { RolesGuards } from '../auth/guards/role.guards';
  import { User } from '../auth/schema/auth.schema';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { SkipThrottle } from '@nestjs/throttler';
  
  @Controller('book')
  export class BookController {
    constructor(private readonly bookServices: BookService) {}
  
    @SkipThrottle()
    @Get()
    @Roles(ERole.MODERATOR, ERole.ADMIN, ERole.USER)
    @UseGuards(AuthGuard(), RolesGuards)
    async findAllBooks(): Promise<Book[]> {
      return await this.bookServices.findAll();
    }
  
    @Post()
    @UseGuards(AuthGuard())
    async createBook(@Body() book: CreateDtoBook, @Req() req): Promise<Book> {
      return await this.bookServices.createBook(book, req.user);
    }
  
    @Get(':id')
    async findByIdBook(@Param('id') id: string): Promise<Book> {
      return await this.bookServices.findByIdBook(id);
    }
  
    @Put('upload/:id')
    @UseGuards(AuthGuard())
    @UseInterceptors(FilesInterceptor('files'))
    async uploadImages(
      @Param('id') id: string,
      @UploadedFiles() file: Array<Express.Multer.File>,
    ) {
      console.log(id);
      console.log(file);
      return;
    }
  }  