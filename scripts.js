const { exec } = require('child_process')

const supportedPlatforms = ['win32', 'darwin', 'linux']

if (supportedPlatforms.indexOf(process.platform)) {
  console.warn(`Your platform (${process.platform}) may be unsupported.`)
}

let args = process.argv.slice(2)

if (args.length < 1) {
  throw new Error('Must provide a task name')
}

let cmd = null

if (args[0] === 'rmdir') {
  if (args.length < 2) {
    throw new Error('Must provide a folder name')
  }

  if (process.platform === 'win32') {
    cmd = `RMDIR /Q /S "${args[1]}"`
  } else if (process.platform === 'darwin' || process.platform === 'linux') {
    cmd = `rm -rf "${args[1]}"`
  }
} else {
  throw new Error(`Unknown task ${args[0]}`)
}

if (cmd) {
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr)
    } else {
      console.log(err)
    }
  })
}
