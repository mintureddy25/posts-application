// src/auth/google.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,  // Inject AuthService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/google/callback',  // Adjust based on your URL
      scope: ['profile', 'email'],
    });
  }

  // This method gets called after the OAuth login is successful
  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = await this.authService.validateUser(profile, 'google');
    const jwt = await this.authService.generateJwt(user);

    return { user, jwt };  // Return user data and JWT token
  }
}
