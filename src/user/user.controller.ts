import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { EditUserDto } from './dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: string, @Body() editUserDto: EditUserDto) {
    return this.userService.editUser(userId, editUserDto);
  }

  @Post('password')
  async changePassword(
    @GetUser('id') userId: string,
    @Body() changePassword: ChangePasswordDto,
  ) {
    return this.userService.changePassword(userId, changePassword);
  }
}
