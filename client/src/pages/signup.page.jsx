import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import SignUpForm from '../components/signup-form.component'
import { userSignUp } from '../contexts/user.actions'
import { UserContext } from '../contexts/user.context'

const SignUpPage = () => {
  const [user, userDispatch] = useContext(UserContext)

  const { isLoading, isAuthenticated, error } = user

  const handleOnSubmit = values => {
    const { name, email, password } = values
    userDispatch(userSignUp({ name, email, password }))
  }

  if (isAuthenticated) return <Redirect to="/" />

  return (
    <div className="flex justify-center items-center flex-grow bg-blue-100">
      <div className="max-w-xl w-full flex justify-center">
        <SignUpForm
          error={error}
          onFinish={handleOnSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default SignUpPage
