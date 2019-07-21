# Contributing

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. You'll also find information
on making a pull request.

## Overview

[Prerequisites](#prerequisites)  
[Installing](#installing)  
[Making Changes](#making-changes)  
[Testing](#testing)  
[Documentation](#documentation)  
[Making a Pull Request](#making-a-pull-request)  

## Prerequisites

You'll need to have Node, Git, and Firebase CLI set up on your local machine.

- [Install Node](https://nodejs.org/en/download/)
- [Install Git](https://git-scm.com/downloads)
- [Setup Firebase CLI](https://firebase.google.com/docs/cli)

## Installing

Follow the steps below to get your development environment set up.

1. Open the terminal and and run the following:

    `git clone https://github.com/The-Diamondback-Lab/dbktv.git`

2. Run `npm install` to install the project dependencies.

## Making Changes

This project is built with [Preact][1], a smaller alternative to [React][2].

To begin making changes, run the command `npm run dev` in your terminal.  
This command will compile both your JSX and Sass files.

### Directories & Files

**Attention: This section is under construction.**

### JavaScript Style

- **2 spaces** – for indentation
- **No unused variables** – this one catches tons of bugs!
- **No semicolons** – It's fine. Really!
- Never start a line with `(` , `[` , or `````
  - This is the only gotcha with omitting semicolons – automatically checked for you!
- **Space after keywords** `if (condition) { ... }`
- Always use `===` instead of `==` – but `obj == null` is allowed to check `null || undefined`.

For a detailed overview of our JavaScript style, visit [**StandardJS**][3].
You'll find not only an overview of Standard Style, but a list of editor plugins
as well.

## Testing

For generating sample test data, use [**Mockaroo**][4].

**Snapshot Testing**
Under `tests/__snapshots__`, add `*.snap` file to test your component spec
against. For information on creating Jest Snapshots, please visit [this link][5].

**Running Tests**
When you're ready to test your changes, you have two options:

1. Run `npm test` in your project directory. This run your tests, as well as all
   the tests in the tests in the `tests` directory.
2. Run `jest <test_pattern> --detectOpenHandles`. This will run all tests with a
   name matching `test_pattern`. Example: `jest foo --detectOpenHandles`

## Documentation

Following [JSDoc][6] standards, be sure to document any
functions, classes, and other code you write. It will be reviewed by a reviewer
during your code review, and your pull request will be denied if any code is
improperly documented.

## Creating a Pull Request

**Note: Before creating a new branch and creating a pull request for your
changes, make sure your build passes all unit tests. If you need help, please
create a test file and leave a comment in the test body, making note of any
issues in their respective files. Make sure to label your pull request "help
wanted."**

If you're ready to have your changes reviewed, make sure your code is well
documented, run `npm run lint` to check your code for syntax + styling errors,
and then create a branch for your changes.

### Branch Naming Convention

**`<your_initials>/`**, followed by: **`feature-`**, **`issue-`**, **`hotfix-`**, or **`release-`**.

For example:

```bash
  git checkout -b ld/feature-docs
  git commit -am "added documentation"
  git push
```

## Submit for Review

- Use [**this template**][7]
- Label your pull request as `help wanted` and `pull request`
- Prefix your pull request title with `PR  -`
- Assign the task to yourself and the appropriate reviewer

[1]: https://preactjs.com/
[2]: https://reactjs.org/
[3]: https://standardjs.com
[4]: https://mockaroo.com/
[5]: https://jestjs.io/docs/en/snapshot-testing
[6]: https://jsdoc.app/
[7]: https://gist.github.com/lexusdrumgold/47ca17fdc04739ffd85b0bf96d546ae7
