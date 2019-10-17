# OS Independent NPM Tasks/Scripts

## Motivation

In general, `npm` tasks/scripts should be platform agnostic. That is, developers should be cautious when they are placing shell commands directly into the task definition.

The following `clean` task simply removes the `node_modules` directory.

```
"clean": "rm -rf node_modules/*"
```

However, this command fails on Windows machines.

## Why not Gulp.JS?

A widely used pipelining tool for Node projects is to use Gulp.JS. Unfortunately, that is not *entirely* viable to use given how the tasks are structured.

For now, assume gulp is not being used. If a developer needs to run the `install` task, then the `preinstall` task will carry out, removing the `node_modules` directory. This could be replaced with the `rimraf` npm package, which recursively removes directories. This creates a pretty gross circular dependency between the node modules and the npm tasks:

+ `rimraf` can only be used if the package is installed, which is possible if one manually runs `npm i rimraf`. But now the developer has to manually execute this; an unnecesary and unwanted burden. And this is all done just to ensure they can the `install` task, which ends up removing their `rimraf` package they just installed! Sure, `rimraf` could be a dev dependency, in which case it will be re-installed after `preinstall` finishes, but the developer just went through unnecessary hoops just to get setup.

And none of this is using gulp yet, which ends up in the same situation as `rimraf` when used as a dev dependency.

## What's the solution then?

Albeit not the most elegant solution, we fallback to using a simple `scripts.js` file, that effectively carries out our tasks without relying on extra dependencies, and instead just on standard libraries.

Currently, we're writing `scripts.js` for Windows, Linux, and MacOS platforms. Otherwise, an error will be thrown.

The program should either:

+ Spawn a child process that carries out an OS-specific command. If this is the case, the developer should keep in mind to write it for all of the supported platforms.
+ Execute some JS command; so the platform should generally not be a worry here.

**The developer should sanitize any arguments where necessary to avoid misuse of the tasks.**

## `scripts.js`

### Usage

The syntax for using this scripts file is straightforward:

```
node scripts.js <taskName> [arg1] [arg2] ... [argN]
```

Simply specify your task name, and any arguments that task may take.

For example, removing a directory and all of it's contents would look like:

```
node scripts.js rm node_modules
```

Note we also do not have to sanitize our arguments, as that is expected from the developer who writes the scripts. So we could do `node scripts.js rm "cd .. && cat secret_file.txt"`, and the script will attempt to find the directory literally named `cd .. && cat secret_file.txt`

### Structure

Tasks are just functions, similar to gulp. The only difference is that the developer has to manually add them to the `tasks` object, which maps a string (or task name) to it's respective function. This makes it relatively easy for a developer to add their own task.

Tasks should have one of two return values:

+ A command string, which gets passed into `child_process.exec`.
+ `null` or `undefined`, indicating it executed a JS command.
