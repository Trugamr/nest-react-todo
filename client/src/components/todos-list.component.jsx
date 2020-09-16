import React from 'react'
import { List } from 'antd'
import TodoListItem from './todo-list-item'

const TodosList = ({
  setCompleted,
  setImportant,
  deleteTodo,
  editTodo,
  isLoading,
  todos = []
}) => {
  return (
    <List
      loading={isLoading}
      itemLayout="horizontal"
      dataSource={todos}
      renderItem={todo => (
        <TodoListItem
          todo={todo}
          setCompleted={setCompleted}
          setImportant={setImportant}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      )}
    />
  )
}

export default TodosList
