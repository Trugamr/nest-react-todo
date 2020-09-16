import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import SignInForm from '../components/signin-form.component'
import { userLogin } from '../contexts/user.actions'
import { UserContext } from '../contexts/user.context'

const SignInPage = () => {
  const [user, userDispatch] = useContext(UserContext)

  const { isLoading, isAuthenticated, error } = user

  const handleOnSubmit = values => {
    const { email, password } = values
    userDispatch(userLogin({ email, password }))
  }

  if (isAuthenticated) return <Redirect to="/" />

  return (
    <div className="flex justify-center items-center flex-grow bg-blue-100">
      <div className="max-w-xl w-full flex justify-center">
        <SignInForm
          error={error}
          onFinish={handleOnSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default SignInPage
