// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';  // Import UsersService

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,  // Inject UsersService
    private readonly jwtService: JwtService,  // Inject JwtService
  ) {}

  // Validate or create a user based on the OAuth profile
  async validateUser(profile: any, provider: string) {
    let user = await this.usersService.findOneByEmail(profile.emails[0].value);

    if (!user) {
      // If user doesn't exist, create a new user
      user = await this.usersService.create({
        email: profile.emails[0].value,
        username: profile.name.givenName || profile.displayName,  // Use the display name
        provider,
      });
    }

    return user;
  }

  // Generate a JWT for the user
  async generateJwt(user: any) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);  // Generate a JWT token
  }
}
