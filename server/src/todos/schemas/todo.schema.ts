import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Todo extends Document {
  @Prop({
    required: true
  })
  text: string

  @Prop({
    default: false
  })
  completed: boolean

  @Prop({
    default: false
  })
  important: boolean
}

export const TodoSchema = SchemaFactory.createForClass(Todo)
