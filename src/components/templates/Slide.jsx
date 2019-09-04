// Packages
import React, { Component } from 'react'

// Components
import { Articles, Default, Multimedia, News } from '.'

/**
 * @file Component representing a deck slide.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Slide extends Component {
  /**
   * Creates a new deck slide.
   *
   * @param {object} props - Component properties
   * @returns {slide}
   */
  constructor(props) {
    super(props)

    /**
    * @property {object} state - Internal component state
    * @property {string | null} state.component - Name of component in lowercase
    * @property {object | null} state.data - Slide data
    * @property {Component | null} state.template - Template component
    * @instance
    */
    this.state = { component: null, data: null, template: null }
  }

  /**
   * Based on
   *
   * @todo Update documentation
   *
   * @param {object} props - Incoming props
   * @param {object} state - Component state
   * @returns {object | null} Object to update the state, or null to update
   * nothing
   */
  // static getDerivedStateFromProps(props, state) {

  // }

  /**
   * After the component has mounted, the internal state will be updated with
   * the name of the current template component, the template to render, and the
   * data associated with it.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    this.choose()
  }

  /**
   * Renders <section> element with the base class 'adt-slide'.
   *
   * @todo Update documentation
   * @returns {HTMLElement}
   */
  render() {
    const { className, id } = this.props
    const { component, template } = this.state
    const style = `adt-slide ${component} ${className || ''}`

    if (component) style.replace('adt-slide', `adt-slide ${component}`)

    return (
      <section id={id} className={style.trim()}>
        {template}
      </section>
    )
  }

  // Helpers

  /**
   * Based on the current component properties, the method updates the internal
   * state with the name of the component in lowercase and the template
   * component to be rendered.
   *
   * @returns {string} Name of component in lowercase
   */
  choose = () => {
    const { className, component, id, ...data } = this.props

    let template = null

    if (component === 'Articles') {
      template = <Articles {...data} />
    } else if (component === 'Multimedia') {
      template = <Multimedia {...data} />
    } else if (component === 'News') {
      template = <News {...data} />
    } else {
      template = <Default />
    }

    const state = { component: component.toLowerCase(), data, template }
    return this.setState(state, () => state.component)
  }
}
