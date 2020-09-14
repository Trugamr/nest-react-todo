import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toObject: {
      transform: function(doc, ret, options) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }
    }
  }
})
export class User {
  // this is not a property, mongoose transforms _id to id
  id: string

  @prop({
    required: true,
    unique: true
  })
  email: string

  @prop({
    required: true
  })
  name: string

  @prop({
    required: true
  })
  password: string
}
