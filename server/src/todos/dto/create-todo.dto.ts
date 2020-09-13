import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateTodoDto {
  @IsNotEmpty()
  text: string

  @IsBoolean()
  @IsOptional()
  completed: boolean

  @IsBoolean()
  @IsOptional()
  important: boolean
}
