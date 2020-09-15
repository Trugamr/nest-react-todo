export const TodosActionTypes = {
  FETCH_TODOS: 'FETCH_TODOS',
  FETCH_TODOS_START: 'FETCH_TODOS_START',
  FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAILURE: 'FETCH_TODOS_FAILURE',
  CREATE_TODO: 'CREATE_TODO',
  SET_LOADING: 'SET_LOADING',
  DELETE_TODO: 'DELETE_TODO'
}

// eslint-disable-next-line
const {
  FETCH_TODOS,
  FETCH_TODOS_START,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  CREATE_TODO,
  SET_LOADING,
  DELETE_TODO
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

export const createTodo = todo => ({
  type: CREATE_TODO,
  payload: todo
})

export const setLoading = isLoading => ({
  type: SET_LOADING,
  payload: isLoading
})

export const deleteTodo = id => ({
  type: DELETE_TODO,
  payload: id
})
