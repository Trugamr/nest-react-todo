import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import SignInForm from '../components/signin-form.component'
import { UserContext } from '../contexts/user.context'

const SignInPage = () => {
  const [user, userDispatch] = useContext(UserContext)

  const { isLoading, isAuthenticated } = user

  const handleOnSubmit = values => {
    const { email, password } = values
    userDispatch({ type: 'LOGIN', payload: { email, password } })
  }

  if (isAuthenticated) return <Redirect to="/" />

  return (
    <div className="flex justify-center items-center flex-grow bg-blue-100">
      <SignInForm onFinish={handleOnSubmit} isLoading={isLoading} />
    </div>
  )
}

export default SignInPage
