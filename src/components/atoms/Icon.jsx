// Packages
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faNewspaper, faPhotoVideo, faSpinner, faSquareFull, faStar
} from '@fortawesome/free-solid-svg-icons'

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

const NewspaperIcon = props => {
  const { className, id, spin } = props
  const style = (`newspaper ${className || ''}`).trim()

  return <Icon id={id} className={style} icon={faNewspaper} spin={spin} />
}

const PhotoVideoIcon = props => {
  const { className, id, spin } = props
  const style = (`photo-video ${className || ''}`).trim()

  return <Icon id={id} className={style} icon={faPhotoVideo} spin={spin} />
}

const SquareIcon = props => {
  const { className, id, spin } = props
  const style = (`square ${className || ''}`).trim()

  return <Icon id={id} className={style} icon={faSquareFull} spin={spin} />
}

const StarIcon = props => {
  const { className, id, spin } = props
  const style = (`star ${className || ''}`).trim()

  return <Icon id={id} className={style} icon={faStar} spin={spin} />
}

export {
  Icon as default, LoadingIcon, NewspaperIcon, PhotoVideoIcon, SquareIcon, StarIcon
}
