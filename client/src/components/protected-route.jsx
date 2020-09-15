import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../contexts/user.context'

const ProtectedRoute = ({ children, ...otherProps }) => {
  const [user] = useContext(UserContext)
  const { isAuthenticated } = user

  if (!isAuthenticated) return <Redirect to="/signin" />

  return <Route {...otherProps}>{children}</Route>
}

export default ProtectedRoute
