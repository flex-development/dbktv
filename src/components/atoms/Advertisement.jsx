// Packages
import React from 'react'
import { AdSlot } from 'react-dfp'

/**
 * Renders an ad slot wrapped in a div with the base class 'ada-advertisment'.
 *
 * @todo Update documentation
 * @param {object} props - Component properties
 * @returns {HTMLDivElement}
 */
const Advertisement = props => {
  const { adUnit, className, id, fetchNow, sizes } = props

  return (
    <div id={id} className={(`ada-advertisement ${className || ''}`).trim()}>
      <AdSlot adUnit={adUnit} sizes={sizes} fetchNow={fetchNow} />
    </div>
  )
}

export default Advertisement
