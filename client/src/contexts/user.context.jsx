import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import {
  UserActionTypes,
  userLogin,
  userLoginFailure,
  userLoginStart,
  userLoginSuccess,
  userLogout,
  userSignUpFailure,
  userSignUpStart,
  userSignUpSuccess,
  clearError
} from './user.actions'
import { useLocation } from 'react-router'

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

export const UserContext = createContext()

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  profile: null,
  error: null
}

const dispatchMiddleware = dispatch => async (action = {}) => {
  console.log(action)
  let response
  const { type, payload = {} } = action
  const { name, email, password } = payload

  switch (type) {
    case LOGIN:
      dispatch(userLoginStart())
      try {
        response = await axios.post('/api/auth/signin', { email, password })
      } catch (error) {
        return dispatch(
          userLoginFailure(error.response.data.message || 'Sign In failed')
        )
      }
      const { accessToken } = response.data
      return dispatch(userLoginSuccess(accessToken))
    case SIGNUP:
      dispatch(userSignUpStart())
      try {
        response = await axios.post('/api/auth/signup', {
          name,
          email,
          password
        })
      } catch (error) {
        return dispatch(
          userSignUpFailure(error.response.data.message || 'Sign Up failed')
        )
      }
      dispatch(userSignUpSuccess())
      return dispatchMiddleware(dispatch)(userLogin({ email, password })) // login after signup
    default:
      return dispatch(action)
  }
}

const userReducer = (state, action = {}) => {
  console.log(action)
  const { type, payload = {} } = action

  switch (type) {
    case SIGNUP_START:
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case LOGIN_SUCCESS:
      cookies.set('Token', payload.accessToken)
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        profile: payload,
        error: null
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    case LOGOUT:
      cookies.remove('Token')
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        profile: null,
        error: null
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)
  const location = useLocation()

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

  // clear error on location path change
  useEffect(() => {
    dispatch(clearError())
  }, [location])

  return (
    <UserContext.Provider value={[state, dispatchMiddleware(dispatch)]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
