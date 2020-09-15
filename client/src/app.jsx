import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/header.component'
import HomePage from './pages/home.page'
import SignInPage from './pages/signin.page'
import 'antd/dist/antd.css'
import './styles/app.css'
import UserProvider from './contexts/user.context'
import ProtectedRoute from './components/protected-route'
import SignUpPage from './pages/signup.page'

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <UserProvider>
        <Header />
        <Switch>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/signin">
            <SignInPage />
          </Route>
          <ProtectedRoute path="/">
            <HomePage />
          </ProtectedRoute>
        </Switch>
      </UserProvider>
    </div>
  )
}

export default App
