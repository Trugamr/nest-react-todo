import jwtDecode from 'jwt-decode'

export const UserActionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SIGNUP: 'SIGNUP',
  SIGNUP_START: 'SIGNUP_START',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

// eslint-disable-next-line
const {
  LOGIN,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SIGNUP,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  CLEAR_ERROR
} = UserActionTypes

export const userLogin = ({ email, password }) => ({
  type: LOGIN,
  payload: { email, password }
})

export const userLoginStart = () => ({
  type: LOGIN_START
})

export const userLoginSuccess = accessToken => {
  const { iat, exp, ...profile } = jwtDecode(accessToken)
  return { type: LOGIN_SUCCESS, payload: { ...profile, accessToken } }
}

export const userLoginFailure = errorMessage => ({
  type: LOGIN_FAILURE,
  payload: errorMessage
})

export const userLogout = () => ({
  type: LOGOUT
})

export const userSignUp = signUpDetails => ({
  type: SIGNUP,
  payload: signUpDetails
})

export const userSignUpStart = () => ({
  type: SIGNUP_START
})

export const userSignUpSuccess = () => {
  return { type: SIGNUP_SUCCESS }
}

export const userSignUpFailure = errorMessage => ({
  type: SIGNUP_FAILURE,
  payload: errorMessage
})

export const clearError = () => ({
  type: CLEAR_ERROR
})
