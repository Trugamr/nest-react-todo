import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TodosModule } from './todos/todos.module'
import { AuthModule } from './auth/auth.module'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env']
    }),
    TypegooseModule.forRoot(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    }),
    TodosModule,
    AuthModule
  ]
})
export class AppModule {}
