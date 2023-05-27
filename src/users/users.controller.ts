import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/sign-up-user.dto';
import { Roles } from './roles.decorator';
import { Role } from './entities/role.enum';
import { RolesGuard } from './roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Post()
  createUser(@Body() signUpDto: SignUpDto) {
    return this.usersService.addUser(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Delete('me')
  deleteUser(@Req() request: Request) {
    // Me to prevent people from deleting users that aren't them, there'd probably be a separate crud route for admin
    const { sub } = request['user'];
    return this.usersService.deleteUser(sub);
  }
}
