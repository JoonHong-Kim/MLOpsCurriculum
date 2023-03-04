import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException,HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.name) {
      throw new HttpException('\"name\" parameter is empty.', HttpStatus.BAD_REQUEST);
    }
    if (typeof createUserDto.name !== 'string') {
      throw new HttpException('\"name\" parameter must be a string.', HttpStatus.BAD_REQUEST);
    }
    if (typeof createUserDto.age) {
      throw new HttpException('\"age\" parameter must be a integer.', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const int_id = +id;
    if (typeof int_id !== 'number') {
      throw new HttpException('Invalid user id.', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.findOne(int_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const int_id = +id;
    if (typeof int_id !== 'number') {
      throw new HttpException('Invalid user id.', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.update(int_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const int_id = +id;
    if (typeof int_id !== 'number') {
      throw new HttpException('Invalid user id.', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.remove(int_id);
  }
}
