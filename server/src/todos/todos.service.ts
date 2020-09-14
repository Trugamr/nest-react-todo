import { Injectable, NotFoundException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CreateTodoDto } from './dto/create-todo.dto'
import { TodoIdDto } from './dto/todo-id.dto'
import { Todo } from './models/todo.model'

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo) private readonly todoModel: ReturnModelType<typeof Todo>
  ) {}

  async createTodo(
    userId: string,
    createTodoDto: CreateTodoDto
  ): Promise<Todo> {
    const todo = new this.todoModel({
      userId,
      ...createTodoDto
    })

    return await todo.save()
  }

  async getTodos(userId: string): Promise<Todo[]> {
    return await this.todoModel.find({ userId }).sort({ updatedAt: 'desc' })
  }

  async getTodo(todoIdDto: TodoIdDto): Promise<Todo> {
    const todo = await this.todoModel.findById(todoIdDto.id)
    if (!todo)
      throw new NotFoundException(`Todo with ID "${todoIdDto.id}" not found`)

    return todo
  }

  async deleteTodo(todoIdDto: TodoIdDto): Promise<void> {
    const todo = await this.todoModel.deleteOne({ _id: todoIdDto.id })
    if (todo && !todo.deletedCount)
      throw new NotFoundException(`Todo with ID "${todoIdDto.id}" not found`)
  }
}
