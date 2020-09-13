import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SignUpDto } from './dto/sign-up.dto'
import { User } from './schemas/user.schema'
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/sign-in.dto'

@Injectable()
export class AuthService {
  constructor(@InjectModel('Users') private userModel: Model<User>) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const newUser = new this.userModel(signUpDto)
    newUser.salt = await bcrypt.genSalt()
    newUser.password = await bcrypt.hash(newUser.password, newUser.salt)

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

  async signIn(signInDto: SignInDto): Promise<User> {
    const { email, password } = signInDto
    const user = await this.userModel.findOne({ email })
    if (!user) throw new UnauthorizedException('Invalid credentials')
    const isPasswordMatching = await bcrypt.compare(password, user.password)

    if (!isPasswordMatching)
      throw new UnauthorizedException('Invalid credentials')

    user.password = null
    user.salt = null

    return user
  }
}
