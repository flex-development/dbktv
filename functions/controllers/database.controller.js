// Packages
const { BadRequest, NotFound } = require('@feathersjs/errors')

/**
 * Class for interacting with the Firebase Realtime Database.
 *
 * @todo Handle realtime changes
 *
 * @class Database
 * @module database
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
module.exports = class Database {
  /**
   * Creates a new Firebase Realtime Database controller.
   *
   * @constructor
   * @param {firebase.database.Database} database - Firebase Realtime Database
   * @throws {Error} If database is undefined or null
   * @returns {Database}
   */
  constructor(database) {
    if (!database) throw new Error('Database required.')

    /**
     * @property {firebase.database.Database} database - Firebase RDB interface
     * @instance
     */
    this.database = database

    if (process.env.NODE_ENV !== 'production') {
      console.info('Instantiated new Database controller.')
    }
  }

  /**
   * Creates a new database entry.
   *
   * @param {string | number | boolean | array | object} data - New data
   * @param {object} params1 - Database options
   * @param {string} params1.path - Path to add database entry
   * @param {boolean} params1.push - If true, create entry with random id
   * @returns {Promise<string>} Entry key
   * @throws {BadRequest} If error adding database entry
   */
  async create(data, { path, push }) {
    try {
      let ref = path ? this.database.ref(path) : this.database.ref()
      if (push) ref = await ref.push()

      // Create database entry
      await ref.set(data)

      return ref.key
    } catch (err) {
      throw new BadRequest(`Error adding entry -> ${err.message}`, {
        errors: { firebase: err.code, path, push, data }
      })
    }
  }

  /**
   * Checks if @see key exists in the current database.
   *
   * @async
   * @param {string} key - Key value, e.g 'foo' or 'foo/bar'
   * @returns {Promise<* | null>} Requested value or null
   * @throws {BadRequest}
   */
  async exists(key) {
    let resource_exists = null

    /** If @see key is undefined, null, or an empty string return false */
    if (!key || (key && !key.length)) return resource_exists

    try {
      resource_exists = await this.find({ path: key })
    } catch (err) {
      /**
       * @see Database#find throws a BadRequest or NotFound error.
       * If the function catches a BadRequest error, or a NotFound error from
       * Firebase, the error will be thrown.
       *
       * If it catches NotFound error, the resource with the key @see key wasn't
       * found and the function will return false.
       */

      if (err.name === 'BadRequest' || err.errors.firebase) throw err
    }

    return resource_exists
  }

  /**
   * Retreives database entries.
   *
   * @param {object} params1 - Query options
   * @param {object} params.path - Path to search database
   * @param {string} params.child - Name of child to order data by
   * @param {string} params.value - Value to search for
   * @returns {Promise<string | number | boolean | array | object>}
   * @throws {BadRequest | NotFound}
   */
  async find({ path, child, value }) {
    // Validate search query
    if ((child && !value) || (!child && value)) {
      const errors = { query: { child, value } }
      throw new BadRequest('Invalid query.', { errors })
    }

    let data = null

    try {
      // Get database reference
      let ref = path ? this.database.ref(path) : this.database.ref()

      // Add search to reference
      if (child && value) {
        ref = ref.orderByChild(child).equalTo(value)
        ref = Object.values((await ref.once('value')).val())
        data = ref.find(resource => resource[child] === value)
      } else {
        data = (await ref.once('value')).val()
      }
    } catch (err) {
      throw new NotFound(`Error getting entries -> ${err.message}`, {
        errors: { firebase: err.code, path, query: { child, value } }
      })
    }

    if (data) return data

    // Throw NotFound error if data isn't found
    const errors = { path, query: { child, value } }
    throw new NotFound('Resource not found.', { errors })
  }

  /**
   * Merges the new data, @see data, with the existing data found in the
   * database at @see path .
   *
   * @async
   * @param {string} path - Database path
   * @param {string | number | boolean | array | object} data - New data
   * @returns {Promise<void>} Resolves when update on server is complete
   * @throws {BadRequest}
   */
  async patch(path, data) {
    try {
      return this.database.ref(path).update(data)
    } catch (err) {
      throw new BadRequest(`Error patching ${path} -> ${err.message}`, {
        errors: { firebase: err.code, path, data }
      })
    }
  }

  /**
   * Overwrites the data at the location @see path. Passing in null @see data
   * will remove the data the given location.
   *
   * @async
   * @param {string} path - Database path
   * @param {string | number | boolean | array | object} data - New data
   * @returns {Promise<string>} Key of updated resource
   * @throws {BadRequest}
   */
  async update(path, data) {
    try {
      return this.database.ref(path).set(data)
    } catch (err) {
      throw new BadRequest(`Error updating ${path} -> ${err.message}`, {
        errors: { firebase: err.code, path, data }
      })
    }
  }

  /**
   * Removes the resource associated with @see path .
   *
   * @async
   * @param {string} path - Database path
   * @returns {Promise<undefined>} Resolves when remove on server is complete
   * @throws {BadRequest}
   */
  async remove(path) {
    try {
      return await this.database.ref(path).remove()
    } catch (err) {
      throw new BadRequest(`Error removing ${path} -> ${err.message}`, {
        errors: { firebase: err.code, path }
      })
    }
  }
}
