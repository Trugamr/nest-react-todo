import React, { useContext, useEffect } from 'react'
import CreateTodoForm from '../components/create-todo-form.component'
import TodosList from '../components/todos-list.component'
import { createTodo, deleteTodo, fetchTodos } from '../contexts/todos.actions'
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

  return (
    <div className="bg-blue-100 flex-grow flex justify-center p-10">
      <div className="max-w-4xl w-full">
        <h1 className="text-pink-400 font-bold text-5xl mb-6">
          sakura{' '}
          <span role="img" aria-label="sakura">
            🌊🌸
          </span>
        </h1>
        <CreateTodoForm onFinish={handleCreateTodo} isLoading={isLoading} />
        <TodosList
          todos={todos}
          isLoading={isLoading}
          deleteTodo={handleDeleteTodo}
          onFinish={handleCreateTodo}
        />
      </div>
    </div>
  )
}

export default HomePage
