const { exec } = require('child_process')

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
function rmdir(dir) {
  if (!dir) {
    throw new Error('Must provide a folder name')
  }

  if (args.length < 2) {
    throw new Error('Must provide a folder name')
  }

  if (process.platform === 'win32') {
    return `RMDIR /Q /S "${args[1]}"`
  } else if (process.platform === 'darwin' || process.platform === 'linux') {
    return `rm -rf "${args[1]}"`
  }
}

let cmd = null

if (args[0] === 'rmdir') {
  cmd = rmdir(args[1])
} else {
  throw new Error(`Unknown task ${args[0]}`)
}

if (cmd) {
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr)
    } else {
      console.log(stdout)
    }
  })
}
