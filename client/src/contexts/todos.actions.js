export const TodosActionTypes = {
  FETCH_TODOS: 'FETCH_TODOS',
  FETCH_TODOS_START: 'FETCH_TODOS_START',
  FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAILURE: 'FETCH_TODOS_FAILURE'
}

// eslint-disable-next-line
const {
  FETCH_TODOS,
  FETCH_TODOS_START,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE
} = TodosActionTypes

export const fetchTodos = (filters = {}) => ({
  type: FETCH_TODOS,
  payload: filters
})

export const fetchTodosStart = () => ({
  type: FETCH_TODOS_START
})

export const fetchTodosSuccess = todos => ({
  type: FETCH_TODOS_SUCCESS,
  payload: todos
})

export const fetchTodosFailure = errorMessage => ({
  type: FETCH_TODOS_FAILURE,
  payload: errorMessage
})
