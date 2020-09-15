import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/header.component'
import HomePage from './pages/home.page'
import SignInPage from './pages/signin.page'
import UserProvider from './contexts/user.context'
import TodosProvider from './contexts/todos.context'
import ProtectedRoute from './components/protected-route'
import SignUpPage from './pages/signup.page'
import 'antd/dist/antd.css'
import './styles/app.css'

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
            <TodosProvider>
              <HomePage />
            </TodosProvider>
          </ProtectedRoute>
        </Switch>
      </UserProvider>
    </div>
  )
}

export default App
