import { Injectable, Scope, Inject, ForbiddenException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { SignUpDto } from './dto/sign-up-user.dto';
import { Role } from './entities/role.enum';

// This should be a real class/interface representing a user entity
export type User = {
  userId: number;
  username: string;
  password: string;
  roles: Role[];
};

@Injectable({ scope: Scope.REQUEST }) // This allows the request object to be accessible accross the service
export class UsersService {
  constructor(@Inject(REQUEST) private req: Request) {} // Dependency Injection of the request object in the class
  private users = [
    // Mock data
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: [Role.ADMIN],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: [Role.USER],
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  addUser(signUpDto: SignUpDto) {
    const userId = Date.now();
    this.users.push({ ...signUpDto, userId, roles: [Role.USER] });
    // const { password, roles, ...returnObj } = signUpDto;
    return { userId, username: signUpDto.username };
  }

  deleteUser(userId: number): User {
    // Using the injected request object, this checks if the delete (action) is performed by the logged in user on thier own account and not another person's own
    const { sub } = this.req['user'];
    if (userId !== sub) throw new ForbiddenException();

    const user = this.users.find((user) => user.userId == userId);
    this.users = this.users.filter((user) => user.userId !== userId);
    return user;
  }
}
