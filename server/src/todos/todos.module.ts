import { Module } from '@nestjs/common'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { Todo } from './models/todo.model'

@Module({
  imports: [TypegooseModule.forFeature([Todo])],
  providers: [TodosService],
  controllers: [TodosController]
})
export class TodosModule {}
