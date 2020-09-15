import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import {
  fetchTodosStart,
  fetchTodosSuccess,
  TodosActionTypes
} from './todos.actions'

export const TodosContext = createContext()

// eslint-disable-next-line
const {
  FETCH_TODOS,
  FETCH_TODOS_START,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE
} = TodosActionTypes

const intitialValue = {
  isLoading: false,
  error: null,
  todos: []
}

const dispatchMiddleware = dispatch => async action => {
  console.log(action)
  const { type, payload } = action
  let response

  switch (type) {
    case FETCH_TODOS:
      dispatch(fetchTodosStart())
      try {
        response = await axios.get('/api/todos')
      } catch (error) {
        console.log({ error })
        dispatch()
      }
      return dispatch(fetchTodosSuccess(response.data))
    default:
      return dispatch(action)
  }
}

const todosReducer = (state, action = {}) => {
  console.log(action)
  const { type, payload = {} } = action

  switch (type) {
    case FETCH_TODOS_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: payload,
        isLoading: false,
        error: null
      }
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        todos: [],
        isLoading: false,
        error: payload
      }
    default:
      return state
  }
}

const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, intitialValue)

  return (
    <TodosContext.Provider value={[state, dispatchMiddleware(dispatch)]}>
      {children}
    </TodosContext.Provider>
  )
}

export default TodosProvider
