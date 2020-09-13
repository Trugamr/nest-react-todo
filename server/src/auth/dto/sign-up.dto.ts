import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  password: string
}
