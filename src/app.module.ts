import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './users/roles.guard';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // TODO This applies the role guard to all routes by default but it was messing with the auth, come back and find out why
  ],
})
export class AppModule {}
