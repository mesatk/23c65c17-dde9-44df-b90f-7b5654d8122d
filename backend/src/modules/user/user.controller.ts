import {
  Controller,
  Get,
  Query,
  Param,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(
    @Query('page') page: string = '1', // default 1
    @Query('pageSize') pageSize: string = '10', // default 10
    @Query('search') search?: string, // search değeri varsa al
  ) {
    const pageNumber = parseInt(page, 10);
    const size = parseInt(pageSize, 10);

    return this.userService.getUsersWithPagination(pageNumber, size, search);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(parseInt(id, 10));

    if (!user) {
      throw new NotFoundException(`ID ${id} ile kullanıcı bulunamadı.`);
    }

    return user;
  }

  @Post('save')
  async saveUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('update')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException(
        `ID ${updateUserDto.id} ile kullanıcı bulunamadı.`,
      );
    }

    return updatedUser;
  }
}
