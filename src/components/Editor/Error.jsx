import React from 'react'

import Empty from 'cozy-ui/transpiled/react/Empty'
import CozyIcon from 'cozy-ui/transpiled/react/Icons/Cozy'
import { useI18n } from 'cozy-ui/react/I18n'

const Error = () => {
  const { t } = useI18n()

  return (
    <Empty icon={CozyIcon} title={t('Error.title')} text={t('Error.text')} />
  )
}

export default Error
