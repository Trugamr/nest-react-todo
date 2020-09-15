import React, { useContext, useEffect } from 'react'
import TodosList from '../components/todos-list.component'
import { fetchTodos } from '../contexts/todos.actions'
import { TodosContext } from '../contexts/todos.context'

const HomePage = () => {
  const [todosState, todosDispatch] = useContext(TodosContext)
  const { todos, isLoading } = todosState

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    todosDispatch(fetchTodos())
  }, [])

  return (
    <div className="bg-blue-100 flex-grow p-10">
      <h1 className="text-pink-400 font-bold text-5xl mb-6">
        sakura{' '}
        <span role="img" aria-label="sakura">
          🌊🌸
        </span>
      </h1>
      <TodosList todos={todos} isLoading={isLoading} />
    </div>
  )
}

export default HomePage
