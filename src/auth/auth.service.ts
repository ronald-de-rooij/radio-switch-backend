import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(authDto: AuthDto) {
    // generate the password hash
    const passwordHash = await argon.hash(authDto.password);
    //save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: authDto.email,
          password: passwordHash,
        },
      });

      delete user.password;

      // Return the user
      return user;
    } catch (error) {
      // PrismaClientKnowRequwstError is an error class provided by Prisma
      if (error instanceof PrismaClientKnownRequestError) {
        // P2002 is the error code for Unique Constraint Violation
        if (error.code === 'P2002') {
          // Represents a situation where a user is not allowed to perform a certain action
          throw new ConflictException('Email address already in use');
        }
      }
      throw error;
    }
  }

  async signIn(authDto: AuthDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: authDto.email,
      },
    });

    // If the user is not found, throw an error
    if (!user) {
      throw new ForbiddenException('Wrong email');
    }

    // If the user is found, compare the password hashes
    const isPasswordValid = await argon.verify(user.password, authDto.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Wrong password');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    try {
      const token = await this.jwtService.signAsync(payload);
      return {
        access_token: token,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
