import React, { useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { headerHeight } from 'components/Header'

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: `calc(100vh - ${headerHeight})`
  }
}))

const View = ({ apiUrl, config }) => {
  const styles = useStyles()

  const initEditor = useCallback(
    () => {
      new window.DocsAPI.DocEditor('onlyOfficeEditor', { ...config })
    },
    [config]
  )

  useEffect(
    () => {
      const script = document.createElement('script')
      script.src = apiUrl
      script.async = true
      script.onload = () => initEditor()

      document.body.appendChild(script)
    },
    [apiUrl, initEditor]
  )

  return (
    <div className={styles.container}>
      <div id="onlyOfficeEditor" />
    </div>
  )
}

export default View
