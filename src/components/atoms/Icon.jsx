// Packages
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faSquareFull } from '@fortawesome/free-solid-svg-icons'

/**
 * @file Icon components
 * @todo Update documentation
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const Icon = props => {
  const { className, id, icon, spin } = props
  const style = (`ada-icon ${className || ''}`).trim()

  return <FontAwesomeIcon id={id} className={style} icon={icon} spin={spin} />
}

const LoadingIcon = props => {
  const { className, id, spin } = props
  const style = (`loading ${className || ''}`).trim()

  return <Icon id={id} className={style} icon={faSpinner} spin={spin} />
}

const SquareIcon = props => {
  const { className, id, spin } = props
  const style = (`square ${className || ''}`).trim()

  return <Icon id={id} className={style} icon={faSquareFull} spin={spin} />
}

export { Icon as default, LoadingIcon, SquareIcon }
