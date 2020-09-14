import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    toJSON: {
      transform: function(doc, ret, options) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }
    }
  }
})
export class Todo {
  @prop({ required: true })
  userId: string

  @prop({
    required: true
  })
  text: string

  @prop({
    default: false
  })
  completed: boolean

  @prop({
    default: false
  })
  important: boolean
}
