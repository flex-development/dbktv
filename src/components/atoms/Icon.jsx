// Packages
import { h, Component } from 'preact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faSquareFull } from '@fortawesome/free-solid-svg-icons'

export default class Icon extends Component {
  render(props, state) {
    const { className, id, icon, spin } = props
    const style = (`ada-icon ${className || ''}`).trim()

    return <FontAwesomeIcon id={id} className={style} icon={icon} spin={spin} />
  }
}

export class LoadingIcon extends Component {
  render(props, state) {
    const { className, id, spin } = props
    const style = (`loading ${className || ''}`).trim()

    return <Icon id={id} className={style} icon={faSpinner} spin={spin} />
  }
}

export class SquareIcon extends Component {
  render(props, state) {
    const { className, id, spin } = props
    const style = (`square ${className || ''}`).trim()

    return <Icon id={id} className={style} icon={faSquareFull} spin={spin} />
  }
}
