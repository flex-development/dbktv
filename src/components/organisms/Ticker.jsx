// Packages
import React, { Fragment } from 'react'
import $ from 'jquery'

// Components
import { Link, SquareIcon } from '../atoms'

/**
 * @file Component representing a news ticker.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Renders a <div> element with the base class 'ado-ticker'.
 *
 * @todo Update documentation
 *
 * @param {object} props - Component properties
 * @param {object} props.items - Ticker content
 * @param {object | undefined} state
 */
const Ticker = props => {
  const { className, id, items } = props

  $('.ado-ticker > .items').css('animation-duration', `${items.length * 5}s`)

  return (
    <div id={id} className={(`ado-ticker ${className || ''}`).trim()}>
      <div className='items'>
        {items.map((item, i) => {
          const id = `ticker-item-${i}`

          return (
            <div className='ticker-item' id={id} key={id}>
              {
                i === items.length - 1
                  ? <Link {...item} />
                  : <Fragment><Link {...item} /><SquareIcon /></Fragment>
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Ticker
