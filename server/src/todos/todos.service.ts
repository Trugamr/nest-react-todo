import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateTodoDto } from './dto/create-todo.dto'
import { Todo } from './schemas/todo.schema'

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todos') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new this.todoModel(createTodoDto)

    return await todo.save()
  }

  async getTodos(): Promise<Todo[]> {
    return await this.todoModel.find()
  }
}
