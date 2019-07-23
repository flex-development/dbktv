// Packages
import { h, Component } from 'preact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default class Icon extends Component {
  render(props, state) {
    const { className, id, icon, spin } = props
    const style = (`ada-icon ${className || ''}`).trim()

    return <FontAwesomeIcon className='ada-icon' icon={icon} spin={spin} />
  }
}

export class LoadingIcon extends Component {
  render(props, state) {
    const { id, spin } = props
    return <Icon id={id} className='loading' icon={faSpinner} spin={spin} />
  }
}
