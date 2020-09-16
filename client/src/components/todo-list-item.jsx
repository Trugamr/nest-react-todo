import React, { useEffect, useRef, useState } from 'react'
import { StarFilled, StarTwoTone } from '@ant-design/icons'
import { Input, List } from 'antd'
import { useOnClickOutside } from '../hooks/useOnClickOutside'

const TodoListItem = ({
  todo,
  setCompleted,
  setImportant,
  deleteTodo,
  editTodo
}) => {
  const [editing, toggleEditing] = useState(false)
  const [todoText, setTodoText] = useState(todo.text)

  // update todo text on new todos
  useEffect(() => {
    setTodoText(todo.text)
  }, [todo])

  const ref = useRef()
  useOnClickOutside(ref, () => toggleEditing(false))

  const handleEditClick = () => {
    if (editing && todo.text !== todoText) editTodo(todo.id, todoText)
    toggleEditing(!editing)
  }

  const handleSetCompleted = (id, completed) => {
    if (!editing) setCompleted(id, completed)
  }

  const handleOnPressEnter = () => {
    if (todo.text !== todoText) editTodo(todo.id, todoText)
    toggleEditing(false)
  }

  return (
    <div ref={ref}>
      <List.Item
        className={`bg-white p-4 ${
          todo.completed ? 'border-pink-400' : undefined
        } border-l-4`}
        actions={[
          <span
            className="cursor-pointer hover:text-blue-400"
            onClick={handleEditClick}
          >
            {editing ? 'save' : 'edit'}
          </span>,
          <span
            className="cursor-pointer hover:text-red-600"
            onClick={() => deleteTodo(todo.id)}
          >
            remove
          </span>
        ]}
      >
        <List.Item.Meta
          avatar={
            <span onClick={() => setImportant(todo.id, !todo.important)}>
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
              onClick={() => handleSetCompleted(todo.id, !todo.completed)}
              className={`text-base cursor-pointer ${
                todo.completed ? 'line-through' : undefined
              }`}
            >
              {editing ? (
                <Input
                  autoFocus={editing}
                  className={`text-base p-0 border-0 focus:bg-blue-100 ${
                    editing ? 'bg-blue-100' : ''
                  }`}
                  value={todoText}
                  onChange={e => setTodoText(e.target.value)}
                  onPressEnter={handleOnPressEnter}
                />
              ) : (
                <span className="text-base">{todoText}</span>
              )}
            </span>
          }
        />
      </List.Item>
    </div>
  )
}

export default TodoListItem
