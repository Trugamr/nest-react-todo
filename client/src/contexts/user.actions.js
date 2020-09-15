import jwtDecode from 'jwt-decode'

export const UserActionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT'
}

// eslint-disable-next-line
const {
  LOGIN,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
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

export const userLogout = () => ({
  type: LOGOUT
})
