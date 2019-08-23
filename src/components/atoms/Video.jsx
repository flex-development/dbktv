// Packages
import React from 'react'

/**
 * @file Component representing a <video> element.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Renders an <video> element with the base class 'ada-video'.
 *
 * @param {object} props - Component properties
 * @param {string} props.controls - True if controls should be displayed
 * @param {string} props.className - Space delimitted list of extra classes
 * @param {object} props.events - Event functions
 * @param {string} props.id - Element id
 * @param {string} props.src - Video source URL
 * @param {object} props.track - Video subtitle track
 * @param {string} props.type - Video source type
 * @param {object} state - Component state
 * @param {object | undefined} context - Component context
 * @returns {HTMLVideoElement}
 */
const Video = props => {
  const { autoplay, controls, className, events, id, src, track, type } = props
  const style = (`ada-video ${className || ''}`).trim()

  // Receiving the following ESLint error: "Media elements such as <audio> and
  // <video> must have a <track> for captions."
  // To reproduce, remove the comment below that disables the rule.

  /* eslint-disable jsx-a11y/media-has-caption */

  return (
    <video
      id={id} className={style}
      autoPlay={autoplay} controls={controls || false} {...events}
    >
      <source src={src} type={type} />
      {track ? <track {...track} /> : null}
    </video>
  )

  /* eslint-enable jsx-a11y/media-has-caption */
}

export default Video
