import { useState, useEffect, useCallback } from 'react'

import log from 'cozy-logger'

const useDoc = ({ client, fileId }) => {
  const [docId, setDocId] = useState(fileId)
  const [loading, setLoading] = useState(true)
  const [doc, setDoc] = useState(undefined)

  const loadDoc = useCallback(
    async () => {
      try {
        if (!loading) setLoading(true)
        const doc = await client
          .getStackClient()
          .fetchJSON('GET', `/office/${docId}/open`)
        setDoc(doc)
      } catch (e) {
        setDoc(false)
        log('warn', `Could not load doc ${docId} : ${e}`)
      }
      setLoading(false)
    },
    [client, loading, docId]
  )

  useEffect(
    () => {
      if (docId !== fileId) {
        // reload if ever fileId changes
        setLoading(true)
        setDoc(undefined)
        setDocId(fileId)
      } else if (client) {
        // load the doc if needed
        if (!doc || doc.data.id !== docId) {
          loadDoc()
        }
      }
    },
    // `loadDoc` and `doc` are willingly not included in the dependencies
    // since React as difficulties to manage complex objects as dependencies.
    // We use docId instead
    [client, fileId, docId, setDocId, setLoading, setDoc] // eslint-disable-line
  )

  return { loading, doc }
}

export default useDoc
