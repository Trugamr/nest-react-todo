import React from 'react'
import { List } from 'antd'
import { StarFilled, StarTwoTone } from '@ant-design/icons'

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
        <List.Item
          className={`bg-white p-4 ${
            todo.completed ? 'border-pink-400' : undefined
          } border-l-4`}
          actions={[
            <span>edit</span>,
            <span
              className="cursor-pointer"
              onClick={() => deleteTodo(todo.id)}
            >
              remove
            </span>
          ]}
        >
          <List.Item.Meta
            avatar={
              <span onClick={() => setImportant(!todo.important)}>
                {todo.important ? (
                  <StarFilled className="text-xl cursor-pointer text-blue-400" />
                ) : (
                  <StarTwoTone
                    className="text-xl cursor-pointer"
                    twoToneColor="#63b3ed"
                  />
                )}
              </span>
            }
            title={
              <span
                onClick={() => setCompleted(!todo.completed)}
                className={`text-base cusor-pointer ${
                  todo.completed ? 'line-through' : undefined
                }`}
              >
                {todo.text}
              </span>
            }
          />
        </List.Item>
      )}
    />
  )
}

export default TodosList
