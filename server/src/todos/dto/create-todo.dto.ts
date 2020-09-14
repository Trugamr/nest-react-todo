import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator'

const parseToBoolean = value => {
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}

export class CreateTodoDto {
  @IsNotEmpty()
  text: string

  @IsBoolean()
  @IsOptional()
  @Transform(parseToBoolean)
  completed: boolean

  @IsBoolean()
  @IsOptional()
  @Transform(parseToBoolean)
  important: boolean
}
