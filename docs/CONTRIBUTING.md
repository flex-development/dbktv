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

This project uses [Flamelink][1], [Google Firebase][2], [React][2], [Sass][3],
and [Babel][4].

### JavaScript Style

- **2 spaces** – for indentation
- **No unused variables** – this one catches tons of bugs!
- **No semicolons** – It's fine. Really!
- Never start a line with `(` , `[` , or `````
  - This is the only gotcha with omitting semicolons – automatically checked for you!
- **Space after keywords** `if (condition) { ... }`
- Always use `===` instead of `==` – but `obj == null` is allowed to check `null || undefined`.

For a detailed overview of our JavaScript style, visit [**StandardJS**][5].
You'll find not only an overview of Standard Style, but a list of editor plugins
as well.

To configure the linting options for this project, make changes to
`.eslintrc.json` and `.eslintignore` in the project root.

Reference: [Configuring ESLint](https://eslint.org/docs/user-guide/configuring)

### Babel

To configure the Babel options for this project, make changes to
`babel.config.js` in the project root.

Reference: [Configure Babel - babel.config.js](https://babeljs.io/docs/en/configuration#babelconfigjs)

### User Interface

Make your changes under the `src` directory.

1. Run `npm run dev` to view the site in `development` Node environment. Your
   JSX and Sass files will be compiled and watched for changes, and ESLint will
   lint your code as you develop.
2. If successful, you'll see something similar to the following in your terminal:

   ```bash
    > @dbklab/yearinreview@0.1.0 dev /Users/lex/Documents/projects/yearinreview
    > NODE_ENV=development cp .env.development .env && concurrently "npm:lint-watch" "npm:js"

    [lint-watch]
    [lint-watch] > @dbklab/yearinreview@0.1.0 lint-watch /Users/lex/Documents/projects/yearinreview
    [lint-watch] > esw -w ./src/api/*.js ./src/components/*.js ./src/components/**/*.js ./src/components/**/*.jsx ./src/controllers/*.js --fix
    [lint-watch]
    [js]
    [js] > @dbklab/yearinreview@0.1.0 js /Users/lex/Documents/projects/yearinreview
    [js] > react-scripts start
    [js]
    [lint-watch] ✓ Clean (10:58:04 PM)
    [js] Starting the development server...
    [js]
    [js] Compiled successfully!
    [js]
    [js] You can now view @dbklab/yearinreview in the browser.
    [js]
    [js]   Local:            http://localhost:3000/
    [js]   On Your Network:  http://192.168.1.18:3000/
    [js]
    [js] Note that the development build is not optimized.
    [js] To create a production build, use npm run build.
    [js]
   ```

To learn more about using Sass with React, please consult [Adding a Sass Stylesheet](https://create-react-app.dev/docs/adding-a-sass-stylesheet) from the React docs.

#### Directories & Files

- `public/index.html`: HTML template
- `src/api`: Flamelink and Firebase configuration. Exports a configured CMS client
- `src/assets`: Project fonts, images, and icons
- `src/components`: React components, organized in an [Atomic Design][6] pattern
- `src/components/index.js`: Main application
- `src/styles`: Application stylesheets, built with [Sass][3], and organized in an [Atomic Design][6] pattern
- `src/utils`: Frontend utility functions
- `src/index.js`: Exports our web app

## Testing

For generating sample test data, use [**Mockaroo**][7].

**Snapshot Testing**
Under `tests/__snapshots__`, add `*.snap` file to test your component spec
against. For information on creating Jest Snapshots, please visit [this link][8].

**Running Tests**
When you're ready to test your changes, you have two options:

1. Run `npm test` in your project directory. This run your tests, as well as all
   the tests in the tests in the `tests` directory.
2. Run `jest <test_pattern> --detectOpenHandles`. This will run all tests with a
   name matching `test_pattern`. Example: `jest foo --detectOpenHandles`

## Documentation

Following [JSDoc][9] standards, be sure to document any
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

- Use [**this template**][10]
- Label your pull request as `pull request` and `needs review`
- Prefix your pull request title with `PR  -`
- Assign the task to yourself and the appropriate reviewer

[1]: https://firebase.google.com/
[2]: https://reactjs.org/
[3]: https://sass-lang.com/
[4]: https://babeljs.io/docs/en/#jsx-and-react
[5]: https://standardjs.com
[6]: http://atomicdesign.bradfrost.com/chapter-2/
[7]: https://mockaroo.com/
[8]: https://jestjs.io/docs/en/snapshot-testing
[9]: https://jsdoc.app/
[10]: ./pull_request_template.md
