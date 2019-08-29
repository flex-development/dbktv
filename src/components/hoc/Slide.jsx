/* eslint-disable react/display-name */

// Packages
import React from 'react'

/**
 * @file Higher order component representing a deck slide
 * @todo Update documentation
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const Slide = (Template, props) => {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.env = process.env.NODE_ENV
    }

    componentDidCatch(error, info) {
      return this.props.catch(error, info)
    }

    componentDidMount() {
      const { component, content, duration, next, slide, title } = this.props

      if (!['staging', 'production'].includes(this.env)) {
        console.info('Slide HOC mounted.')
      }

      if (component === 'News') {
        document.title = `Top News: ${title}`
        $('.ado-deck').css('background-image', `url(${content.image.src})`)
      } else if (component === 'Multimedia') {
        document.title = `Gallery: ${title}`
        $('.ado-footer').addClass('multimedia-border')
        $('.ado-nav').addClass('ui-hide')
      } else {
        document.title = `Continue reading on dbknews.com`
      }

      setTimeout(() => slide(next), duration)
    }
  }
}

export default Slide

/* eslint-enable react/display-name */
