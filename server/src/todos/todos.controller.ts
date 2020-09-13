import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { Todo } from './schemas/todo.schema'
import { TodosService } from './todos.service'

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  createTodo(@Body(ValidationPipe) createTodo: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodo)
  }

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todosService.getTodos()
  }
}
