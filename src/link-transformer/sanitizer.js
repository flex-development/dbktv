/* eslint-disable no-multi-spaces */

/**
 * List of right quotation marks and similar symbols.
 */
const RIGHT_SINGLE_QUOTE = [
  0x2019, // right single quotation
  0x02bc, // modifier letter apostrophe
  0x02be, // modifier letter right half ring
  0x055a, // armenian apostrophe
  0x1fdb, // greek koronis
  0x1fbf  // greek psili
]

/**
 * List of single left quotation marks and similar symbols.
 */
const LEFT_SINGLE_QUOTE = [
  0x02bb, // modifier letter reversed comma
  0x02bf, // modifier letter left half ring
  0x2018, // left single quotation mark
  0x201b  // single high-reversed-9 quotation mark
]

/**
 * List of right double quotes and similar symbols.
 */
const RIGHT_DOUBLE_QUOTES = [
  0x00bb, // right-pointing double angle quotation mark (guillemet)
  0x201d  // right double quotation mark
]

/**
 * List of left double quotes and similar symbols.
 */
const LFET_DOUBLE_QUOTES = [
  0x02ab, // left-pointing double angle quotation mark (guillemet)
  0x201c  // left double quotation mark
]

/**
 * Sanitizes quote-like characters into their UTF-8 variants. Specifically replaces
 * single quote-like characters with 0x0027 and double quote-like characters with
 * 0x0022.
 *
 * Internally, the function reads in the string into a buffer with the UTF-16 LE
 * encoding. Sanitizing the characters involves writing directly the buffer,
 * avoiding creating a new string each time via `String.replace`.
 * @param {string} str UTF-16 LE encoded string.
 * @returns {string} a sanitized string, in UTF-16 LE encoding.
 */
function sanitize(str) {
  // Store string into buffer with UTF-16 LE encoding
  let buf = Buffer.from(str, 'utf16le')

  // Go over all values in buffer. Skip every other element (or all odd-indices)
  // since we are reading 2 bytes at a time.
  for (let i = 0; i < buf.length; i += 2) {
    // Read in character at index i in string
    let ch = buf.readUInt16LE(i)

    if (RIGHT_SINGLE_QUOTE.indexOf(ch) > -1 || LEFT_SINGLE_QUOTE.indexOf(ch) > -1) {
      // Writing apostrophe character (')
      buf.writeUInt16LE(0x0027, i)
    } else if (RIGHT_DOUBLE_QUOTES.indexOf(ch) > -1 || LFET_DOUBLE_QUOTES.indexOf(ch) > -1) {
      // Writing double quote character (")
      buf.writeUInt16LE(0x0022, i)
    }
  }

  return buf.toString('utf16le')
}

module.exports = sanitize
