import { Transform } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator'

const parseToBoolean = value => {
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}

export class FiltersDto {
  @IsOptional()
  @IsNotEmpty()
  query: string

  @IsBoolean()
  @IsOptional()
  @Transform(parseToBoolean)
  completed: boolean

  @IsBoolean()
  @IsOptional()
  @Transform(parseToBoolean)
  important: boolean
}
