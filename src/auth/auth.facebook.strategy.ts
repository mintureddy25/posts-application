// src/auth/facebook.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,  // Inject AuthService
  ) {
    super({
      clientID: configService.get('FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_APP_SECRET'),
      callbackURL: 'http://localhost:3000/auth/facebook/callback',  // Adjust based on your URL
      scope: ['email'],
    });
  }

  // This method gets called after the OAuth login is successful
  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = await this.authService.validateUser(profile, 'facebook');
    const jwt = await this.authService.generateJwt(user);

    return { user, jwt };  // Return user data and JWT token
  }
}
