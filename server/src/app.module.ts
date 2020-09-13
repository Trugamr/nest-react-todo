import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('xsdasd' + process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    TodosModule
  ]
})
export class AppModule {}
