import React from 'react'

import { useClient } from 'cozy-client'

import useDoc from 'hooks/useDoc'
import Header from 'components/Header'
import View from './View'
import Error from './Error'
import Loading from './Loading'

export const Editor = props => {
  const client = useClient()
  const { loading, doc } = useDoc({ client, fileId: props.match.params.id })

  if (loading) return <Loading />
  if (!doc) return <Error />

  const { data } = doc
  const onlyOffice = data.attributes.onlyoffice
  const serverUrl = onlyOffice.url
  const apiUrl = `${serverUrl}/web-apps/apps/api/documents/api.js`

  // complete config doc : https://api.onlyoffice.com/editors/advanced
  const config = {
    document: onlyOffice.document,
    editorConfig: onlyOffice.editor,
    token: onlyOffice.token,
    documentType: onlyOffice.documentType
  }

  return (
    <>
      <Header title={onlyOffice.document.title} />
      <View apiUrl={apiUrl} config={config} />
    </>
  )
}

export default Editor
