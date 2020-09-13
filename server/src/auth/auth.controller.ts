import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { User } from './schemas/user.schema'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto)
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<User> {
    return this.authService.signIn(signInDto)
  }
}
