import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  private users: Array<User> = [];
  private lastId: number = 0;

  create(createUserDto: CreateUserDto) {
    // check name is duplicated
    const duplicated_user = this.users.find(
      (u) => u.name === createUserDto.name,
    );
    if (duplicated_user) {
      throw new HttpException(
        'The user is already exist.',
        HttpStatus.CONFLICT,
      );
    }
    // check age can convert to number
    const age = +createUserDto.age;
    if (typeof age !== 'number') {
      throw new HttpException(
        '"age" parameter must be a integer.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = {
      id: this.lastId++,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return [...this.users];
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new HttpException('The user is not found.', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) {
      throw new HttpException('The user is not found.', HttpStatus.NOT_FOUND);
    }

    const duplicated_user = this.users.find(
      (u) => u.name === updateUserDto.name && u.id !== id,
    );
    if (duplicated_user) {
      throw new HttpException(
        'The user is already exist.',
        HttpStatus.CONFLICT,
      );
    }

    this.remove(id);

    const updatedUser = {
      ...user,
      ...updateUserDto,
    };
    this.users.push(updatedUser);

    return updatedUser;
  }

  remove(id: number) {
    const user = this.findOne(id);
    if (!user) {
      throw new HttpException('The user is not found.', HttpStatus.NOT_FOUND);
    }
    this.users = this.users.filter((u) => u.id !== user.id);
    return user;
  }
}
