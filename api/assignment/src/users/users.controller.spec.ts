import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let id: number = 0;
  const mockUser: any = { name: 'Joonhong', age: 27 };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a user', () => {
      expect(controller.create(mockUser)).toEqual({
        id: id++,
        ...mockUser,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      controller.create(mockUser);
      expect(controller.findAll()).toEqual([{ id: 0, ...mockUser }]);
    });
  });

  describe('findOne', () => {
    it('should return a user', () => {
      controller.create(mockUser);
      expect(controller.findOne('0')).toEqual({
        id: 0,
        ...mockUser,
      });
    });
  });

  describe('update', () => {
    it('should return a user', () => {
      controller.create(mockUser);
      expect(controller.update('0', { name: 'eee', age: 22 })).toEqual({
        id: 0,
        name: 'eee',
        age: 22,
      });
    });
  });

  describe('remove', () => {
    it('should return a user', () => {
      controller.create(mockUser);
      expect(controller.remove('0')).toEqual({
        id: 0,
        ...mockUser,
      });
      expect(controller.findAll()).toEqual([]);
    });
  });
});
