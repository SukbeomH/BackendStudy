import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useClass: MockUserRepository },
      ],
    }).compile();
    userService = userModule.get<UserService>(UserService);
  });

  describe('create', () => {
    it('already exist email?', async () => {
      const mockData = {
        email: 'a@a.com',
        hashedPassword: 'sadf',
        name: 'heij',
        age: 20,
      };
      try {
        await userService.create({ ...mockData });
      } catch (err) {
        expect(err).toBe('[ConflictException: 이미 등록된 메일입니다]');
      }
    });

    it('successfully registered?', async () => {
      const mockData = {
        email: 'aasd@a.com',
        hashedPassword: '1234',
        name: 'giredda',
        age: 231,
      };
      const mockResultData = {
        email: 'aasd@a.com',
        password: '1234',
        name: 'giredda',
        age: 231,
      };
      const result = await userService.create({ ...mockData });
      expect(result).toStrictEqual(mockResultData);
    });
  });

  describe('findOne', () => {
    it('', () => {});
  });
});

class MockUserRepository {
  MockDB = [
    { email: 'a@a.com', password: 'sadf', name: 'heij', age: 20 },
    { email: 'aaa@aaa.com', password: 'sadf', name: 'heij', age: 20 },
    { email: 'dfs@sdfa.com', password: 'sadf', name: 'heij', age: 20 },
  ];

  findOne({ email }) {
    const users = this.MockDB.filter((e) => e.email === email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.MockDB.push({ email, password, name, age });
    return { email, password, name, age };
  }
}
