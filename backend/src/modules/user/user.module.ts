import { Module } from '@nestjs/common';
import { UserController } from './user.controller'; // Kullanıcı controller'ı
import { UserService } from './user.service'; // Kullanıcı servisi

@Module({
  imports: [
    // TypeOrmModule.forFeature([UserEntity]), // UserEntity'yi TypeORM ile kullanılır hale getiriyoruz
  ],
  controllers: [UserController], // Controller, HTTP isteklerini yönlendirmek için kullanılır
  providers: [UserService], // Servis, iş mantığını sağlar
  exports: [UserService], // Eğer UserService'i başka modüllerde de kullanmak isterseniz export edebilirsiniz
})
export class UserModule {}
