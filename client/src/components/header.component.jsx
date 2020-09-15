import React, { useContext } from 'react'
import { PageHeader, Button } from 'antd'
import { useHistory } from 'react-router'
import { UserContext } from '../contexts/user.context'
import { userLogout } from '../contexts/user.actions'

const Header = () => {
  const history = useHistory()
  const [user, userDispatch] = useContext(UserContext)
  const { isAuthenticated, profile } = user

  return (
    <div className="site-page-header-ghost-wrapper border-b-2 border-pink-500">
      <PageHeader
        ghost={false}
        title="🌊🌸"
        subTitle={
          isAuthenticated ? `${profile.name.toLowerCase()}'s todos` : 'sakura'
        }
        extra={
          isAuthenticated
            ? [
                <Button
                  key="1"
                  type="primary"
                  onClick={() => userDispatch(userLogout())}
                >
                  Sign Out
                </Button>
              ]
            : [
                <Button
                  key="1"
                  type="primary"
                  onClick={() => history.push('/signin')}
                >
                  Sign In
                </Button>
              ]
        }
      ></PageHeader>
    </div>
  )
}

export default Header
