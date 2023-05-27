import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { NewUserDto } from 'src/users/dto/new-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @HttpCode(HttpStatus.OK)
  //   @Post('login')
  //   signIn(@Body() signInDto: NewUserDto) {
  //     return this.authService.signIn(signInDto.username, signInDto.password);
  //   }

  //   @UseGuards(AuthGuard)
  //   @Get('profile')
  //   getProfile(@Request() req) {
  //     return req.user;
  //   }
}
