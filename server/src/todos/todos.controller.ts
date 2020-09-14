import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { User } from 'src/auth/models/user.model'
import { TodoIdDto } from './dto/todo-id.dto'

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createTodo(
    @GetUser() user: JwtPayload,
    @Body(ValidationPipe) createTodoDto: CreateTodoDto
  ): Promise<Todo> {
    return this.todosService.createTodo(user.id, createTodoDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTodos(@GetUser() user: User): Promise<Todo[]> {
    return this.todosService.getTodos(user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getTodo(@Param(ValidationPipe) todoIdDto: TodoIdDto) {
    return this.todosService.getTodo(todoIdDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteTodo(@Param(ValidationPipe) todoIdDto: TodoIdDto) {
    return this.todosService.deleteTodo(todoIdDto)
  }
}
