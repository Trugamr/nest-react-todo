import React, { useContext, useEffect } from 'react'
import CreateTodoForm from '../components/create-todo-form.component'
import TodosList from '../components/todos-list.component'
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  setCompleted,
  setImportant,
  setTodoText
} from '../contexts/todos.actions'
import { TodosContext } from '../contexts/todos.context'

const HomePage = () => {
  const [todosState, todosDispatch] = useContext(TodosContext)
  const { todos, isLoading } = todosState

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    todosDispatch(fetchTodos())
  }, [])

  const handleCreateTodo = ({ text }) => {
    todosDispatch(createTodo({ text }))
  }

  const handleDeleteTodo = id => {
    todosDispatch(deleteTodo(id))
  }

  const handleSetCompleted = (id, completed) => {
    todosDispatch(setCompleted(id, completed))
  }

  const handleSetImportant = (id, important) => {
    todosDispatch(setImportant(id, important))
  }

  const handleEditTodo = (id, text) => {
    todosDispatch(setTodoText(id, text))
  }

  return (
    <div className="bg-blue-100 flex-grow flex justify-center p-10">
      <div className="max-w-4xl w-full">
        <h1 className="text-pink-400 font-bold text-5xl mb-6">
          sakura{' '}
          <span role="img" aria-label="sakura">
            🌊🌸
          </span>
        </h1>
        <div className="mb-6">
          <CreateTodoForm onFinish={handleCreateTodo} isLoading={isLoading} />
        </div>
        <TodosList
          todos={todos}
          isLoading={isLoading}
          deleteTodo={handleDeleteTodo}
          onFinish={handleCreateTodo}
          setCompleted={handleSetCompleted}
          setImportant={handleSetImportant}
          editTodo={handleEditTodo}
        />
      </div>
    </div>
  )
}

export default HomePage
