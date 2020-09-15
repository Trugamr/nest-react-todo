import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import {
  UserActionTypes,
  userLoginStart,
  userLoginSuccess,
  userLogout
} from './user.actions'

const { LOGIN, LOGIN_START, LOGIN_SUCCESS, LOGOUT } = UserActionTypes

export const UserContext = createContext()

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  profile: null,
  errors: []
}

const dispatchMiddleware = dispatch => async (action = {}) => {
  console.log(action)
  const { type, payload = {} } = action
  const { email, password } = payload

  switch (type) {
    case LOGIN:
      dispatch(userLoginStart())
      const res = await axios.post('/api/auth/signin', { email, password })
      const { accessToken } = res.data
      return dispatch(userLoginSuccess(accessToken))
    default:
      return dispatch(action)
  }
}

const userReducer = (state, action = {}) => {
  console.log(action)
  const { type, payload = {} } = action

  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_SUCCESS:
      cookies.set('Token', payload.accessToken)
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        profile: payload,
        errors: []
      }
    case LOGOUT:
      cookies.remove('Token')
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        profile: null,
        errors: []
      }
    default:
      return state
  }
}

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    // get jwt from cookie
    const jwt = cookies.get('Token')
    try {
      const profile = jwtDecode(jwt)
      const { exp } = profile
      const isExpired = new Date() / 1000 >= exp
      if (isExpired) {
        dispatch(userLogout())
        throw new Error('JWT Expired')
      }
      dispatch(userLoginSuccess(jwt))
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  return (
    <UserContext.Provider value={[state, dispatchMiddleware(dispatch)]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
