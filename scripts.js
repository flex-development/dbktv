const { exec } = require('child_process')
const fs = require('fs')

const supportedPlatforms = ['win32', 'darwin', 'linux']

if (supportedPlatforms.indexOf(process.platform)) {
  console.warn(`Your platform (${process.platform}) may be unsupported.`)
}

let args = process.argv.slice(2)

if (args.length < 1) {
  throw new Error('Must provide a task name')
}

/**
 * Genereates a shell command equivalent to "rm -rf" for multiple
 * platforms
 * @param {string} dir name of directory
 * @returns {string} command to recursively remove directory
 */
function rm(dir) {
  if (!dir) {
    throw new Error('Must provide a folder name')
  }

  if (args.length < 2) {
    throw new Error('Must provide a folder name')
  }

  if (process.platform === 'win32') {
    return `DEL /F /Q /S "${args[1]}"`
  } else if (process.platform === 'darwin' || process.platform === 'linux') {
    return `rm -rf "${args[1]}"`
  }
}

/**
 * Copies one file to another destination.
 * @param {string} src source file
 * @param {string} dest destination file
 * @returns {void}
 */
function cp(src, dest) {
  fs.copyFile(src, dest, (err) => {
    if (err) {
      throw err
    }
  })
}

let tasks = {
  rm,
  cp
}

let task = tasks[args[0]]

if (!task) {
  throw new Error(`Unknown task ${args[0]}. Ensure the task is defined in the tasks object.`)
} else {
  let cmd = task(...args.slice(1))

  if (cmd == null) {
    console.info(`${args[0]} didn't return a command. Assuming it executed a JS command`)
  } else {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr)
      } else {
        console.log(stdout)
      }
    })
  }
}
