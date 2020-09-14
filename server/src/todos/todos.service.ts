import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CreateTodoDto } from './dto/create-todo.dto'
import { Todo } from './models/todo.model'

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo) private readonly todoModel: ReturnModelType<typeof Todo>
  ) {}

  async create(userId: string, createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new this.todoModel({
      userId,
      ...createTodoDto
    })

    return await todo.save()
  }

  async getTodos(): Promise<Todo[]> {
    return await this.todoModel.find()
  }
}
