import { IsMongoId, IsNotEmpty } from 'class-validator'

export class TodoIdDto {
  @IsNotEmpty()
  @IsMongoId({
    message: 'Invalid id format'
  })
  id: string
}
