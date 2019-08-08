// Packages
import { h, Component } from 'preact'

export default class NotFound extends Component {
  componentDidMount() {
    console.error('Sorry, the page you requested was not found.')
  }

  render() {
    return (
      <main className='adp-not-found'>
        <h1>{this.props.name}</h1>
      </main>
    )
  }
}
