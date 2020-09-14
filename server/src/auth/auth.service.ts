import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common'
import { SignUpDto } from './dto/sign-up.dto'
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/sign-in.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'
import { InjectModel } from 'nestjs-typegoose'
import { User } from './models/user.model'
import { ReturnModelType } from '@typegoose/typegoose'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const newUser = new this.userModel(signUpDto)
    const salt = await bcrypt.genSalt()
    newUser.password = await bcrypt.hash(newUser.password, salt)

    try {
      await newUser.save()
    } catch (error) {
      if (error?.code === 11000)
        throw new ConflictException('User with this email already exists')
      else {
        console.error(error)
        throw new InternalServerErrorException()
      }
    }
  }

  async validateUser(signInDto: SignInDto): Promise<User> {
    const { email, password } = signInDto
    const user = await this.userModel.findOne({ email })
    if (!user) throw new UnauthorizedException('Invalid credentials')
    const isPasswordMatching = await bcrypt.compare(password, user.password)

    if (!isPasswordMatching)
      throw new UnauthorizedException('Invalid credentials')

    user.password = undefined

    return user
  }

  signIn(user: User): { accessToken: string } {
    const { name, email, id } = user
    const payload: JwtPayload = { name, email, id }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
