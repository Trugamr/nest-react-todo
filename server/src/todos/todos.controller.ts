import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { GetUser } from 'src/auth/get-user.decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { JwtPayload } from 'src/auth/jwt-payload.interface'
import { CreateTodoDto } from './dto/create-todo.dto'
import { TodosService } from './todos.service'
import { Todo } from './models/todo.model'

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createTodo(
    @GetUser() user: JwtPayload,
    @Body(ValidationPipe) createTodoDto: CreateTodoDto
  ): Promise<Todo> {
    return this.todosService.create(user.id, createTodoDto)
  }

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todosService.getTodos()
  }
}
