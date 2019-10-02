/**
 * @file General utility functions
 * @module utilities/app
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

export default {
  /**
   * Converts @see @param convert into a SEO-friendly URL slug.
   *
   * If @param convert is undefined, null, or empty, the function will return an
   * empty string.
   *
   * @param {string | null | undefined} convert - String to convert
   * @returns {string} URL optimized string
   * @see {@link https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1}
   */
  slugify: convert => {
    if (!convert || !convert.length) return ''

    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return convert.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w-]+/g, '') // Remove all non-word characters
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }
}
