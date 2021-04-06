import React from 'react'
import { hot } from 'react-hot-loader'
import { makeStyles } from '@material-ui/core/styles'

import { Route, Switch, HashRouter } from 'react-router-dom'
import { Layout, Main, Content } from 'cozy-ui/react/Layout'
import { Sprite as IconSprite } from 'cozy-ui/react/Icon'

import Editor from 'components/Editor'

const useStyles = makeStyles(() => ({
  layout: {
    '&::before': {
      display: 'none'
    },
    '&::after': {
      display: 'none'
    }
  },
  content: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const App = () => {
  const styles = useStyles()

  return (
    <HashRouter>
      <Layout className={styles.layout}>
        <Main>
          <style>#coz-bar {'{ display: none }'}</style>
          <Content className={styles.content}>
            <Switch>
              <Route path="/:id" component={Editor} />
            </Switch>
          </Content>
        </Main>
        <IconSprite />
      </Layout>
    </HashRouter>
  )
}

/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/
export default hot(module)(App)
