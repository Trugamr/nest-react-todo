import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/sign-up.dto'
import { GetUser } from './get-user.decorator'
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'
import { User } from './models/user.model'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  signIn(@GetUser() user: User): { accessToken: string } {
    return this.authService.signIn(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@GetUser() user): User {
    return user
  }
}
