import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: string, editUserDto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...editUserDto,
      },
    });

    delete user.password;

    return user;
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // If the user is found, compare the password hashes
    const isOldPasswordValid = await argon.verify(
      user.password,
      changePasswordDto.oldPassword,
    );

    if (!isOldPasswordValid) {
      throw new ForbiddenException('The current password is incorrect');
    }

    // generate the password hash
    const hash = await argon.hash(changePasswordDto.newPassword);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hash,
      },
    });

    return {
      message: 'Password changed successfully',
    };
  }
}
