import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { UpdateTodoDto } from './dto/update-todo.dto'
import { FiltersDto } from './dto/filters.dto'

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
  async getTodos(
    @GetUser() user: User,
    @Query(ValidationPipe) filtersDto: FiltersDto
  ): Promise<Todo[]> {
    return this.todosService.getTodos(user.id, filtersDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getTodo(@Param(ValidationPipe) todoIdDto: TodoIdDto): Promise<Todo> {
    return this.todosService.getTodo(todoIdDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteTodo(@Param(ValidationPipe) todoIdDto: TodoIdDto): Promise<void> {
    return this.todosService.deleteTodo(todoIdDto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateTodo(
    @Param(ValidationPipe) todoIdDto: TodoIdDto,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto
  ): Promise<Todo> {
    return this.todosService.updateTodo(todoIdDto, updateTodoDto)
  }
}
