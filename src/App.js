import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useRoutes } from './Routes'
import Header from './components/Header'
import Footer from './components/Footer'

import { isAuthenticated, fetchAuthUser } from './redux/slices/userAuthSlice'

import './styles/App.scss'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthenticated)
  const theme = useSelector(state => state.changeTheme.theme)

  React.useEffect(() => {
    dispatch(fetchAuthUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const routes = useRoutes(isAuth)

  return (
    <div className='App' id={theme}>
      <div className='container'>
        <Router>
          <Header />
          {routes}
        </Router>
        <Footer />
      </div>
    </div>
  )
}

export default App