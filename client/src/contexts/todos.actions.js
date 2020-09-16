export const TodosActionTypes = {
  FETCH_TODOS: 'FETCH_TODOS',
  FETCH_TODOS_START: 'FETCH_TODOS_START',
  FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAILURE: 'FETCH_TODOS_FAILURE',
  CREATE_TODO: 'CREATE_TODO',
  SET_LOADING: 'SET_LOADING',
  DELETE_TODO: 'DELETE_TODO',
  TODO_SET_COMPLETED: 'TODO_SET_COMPLETED',
  TODO_SET_IMPORTANT: 'TODO_SET_IMPORTANT',
  TODO_SET_TEXT: 'TODO_SET_TEXT'
}

// eslint-disable-next-line
const {
  FETCH_TODOS,
  FETCH_TODOS_START,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  CREATE_TODO,
  SET_LOADING,
  DELETE_TODO,
  TODO_SET_COMPLETED,
  TODO_SET_IMPORTANT,
  TODO_SET_TEXT
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

export const setCompleted = (id, completed) => ({
  type: TODO_SET_COMPLETED,
  payload: { id, completed }
})

export const setImportant = (id, important) => ({
  type: TODO_SET_IMPORTANT,
  payload: { id, important }
})

export const setTodoText = (id, text) => ({
  type: TODO_SET_TEXT,
  payload: { id, text }
})
