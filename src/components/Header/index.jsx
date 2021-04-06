import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PreviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'
import Typography from 'cozy-ui/transpiled/react/Typography'

export const headerHeight = '3rem'

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 2rem)',
    height: headerHeight,
    padding: '0 1rem'
  }
}))

export const Header = ({ title, onClose }) => {
  const styles = useStyles()

  return (
    <header className={styles.header}>
      {onClose && (
        <IconButton onClick={onClose}>
          <Icon icon={PreviousIcon} />
        </IconButton>
      )}
      <Typography className="u-pl-half" variant="h3" noWrap>
        {title}
      </Typography>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func
}

export default Header
