import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // Initiates the Google OAuth login flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req) {
    // This is where the JWT token will be returned after successful login
    return { jwt: req.user.jwt }; // Respond with JWT token
  }
}
