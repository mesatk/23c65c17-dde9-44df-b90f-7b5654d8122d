// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, DatabaseService], // Servisleri ekliyoruz
})
export class AppModule {}
