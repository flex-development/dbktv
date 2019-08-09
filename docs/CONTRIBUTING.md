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

This project uses [Flamelink][1] for its Content Management System, [Google Firebase][2]
on the backend, and [Preact][3], a smaller alternative to [React][4], on the
frontend.

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

### Cloud Functions

Make your changes under the `functions` directory.

1. Retreive the `credentials.firebase.json` file from a team leader. Place it
   under in the the `functions/cms` directory.
2. Run `npm run dev-functions` to begin emulating Cloud Functions in a
   `development` Node environment.
3. After running the command, you'll see something similar to the following in
   your terminal:

   ```bash
    wireless-10-105-182-92:dbktv LexusDrumgold$ npm run dev-functions

    > @thedbklab/diamondbacktv@1.0.0 dev-functions /Users/LexusDrumgold/Documents/projects/dbktv
    > npm run --prefix functions dev


    > @thedbklab/dbktvcloud@1.0.0 dev /Users/LexusDrumgold/Documents/projects/dbktv/functions
    > NODE_ENV=development firebase serve --only functions

    ⚠  Your requested "node" version "10" doesn't match your global version "12"
    ✔  functions: Emulator started at http://localhost:5000
    i  functions: Watching "/Users/LexusDrumgold/Documents/projects/dbktv/functions" for Cloud Functions...
    >  Initialized Documentation service on http://localhost:5000/thedbktv/us-central1/cloud/docs
    >  Node environment: development -> Cloud services started on http://localhost:5000
    i  functions: HTTP trigger initialized at http://localhost:5000/thedbktv/us-central1/cloud
   ```

#### Cloud Functions: Directories & Files

- `functions/cms`: Flamelink and Firebase configuration. Exports a configured CMS client
- `functions/config`: Contains our Feathers configuration files, as well as our
  Firebase Admin credentials. To learn more about Feathers configuration, visit
  [this link][6]
- `functions/controllers`: Application controllers
- `functions/feathers`: [Feathers][7] application, services, hooks, models, and
  utility functions
- `functions/triggers`: [Firebase Cloud Function][8] triggers
- `functions/index.js`: Exports our cloud functions

### User Interface

The design spec can be found [here][9]. When ready, make your changes under the
`src` directory.

1. Run `npm run dev-components` to launch the DBKTV frontend in a `development`
   Node environment. This command will compile both your JSX and Sass files, as
   watch your files for changes you develop.
2. If successful, you'll see something similar to the following in your terminal:

   ```bash
    Compiled successfully!

    You can view the application in browser.

    Local:            http://localhost:3000
    On Your Network:  http://10.105.182.92:3000
   ```

#### User Interface: Directories & Files

- `src/assets`: Project fonts, images, and icons
- `src/components`: Preact components, organized in an [Atomic Design][10] pattern
- `src/components/index.js`: Main application
- `src/style`: Application stylesheets, built with [Sass][12], and organized in an [Atomic Design][10] pattern
- `src/utils`: Frontend utility functions
- `src/index.html`: HTML template
- `src/index.js`: Exports our web app
- `./preact.config.js`: Preact configuration

## Testing

For generating sample test data, use [**Mockaroo**][13].

**Snapshot Testing**
Under `tests/__snapshots__`, add `*.snap` file to test your component spec
against. For information on creating Jest Snapshots, please visit [this link][14].

**Running Tests**
When you're ready to test your changes, you have two options:

1. Run `npm test` in your project directory. This run your tests, as well as all
   the tests in the tests in the `tests` directory.
2. Run `jest <test_pattern> --detectOpenHandles`. This will run all tests with a
   name matching `test_pattern`. Example: `jest foo --detectOpenHandles`

## Documentation

Following [JSDoc][15] standards, be sure to document any
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

- Use [**this template**][16]
- Label your pull request as `pull request` and `needs review`
- Prefix your pull request title with `PR  -`
- Assign the task to yourself and the appropriate reviewer

[1]: https://flamelink.github.io/flamelink/
[2]: https://firebase.google.com/
[3]: https://preactjs.com/
[4]: https://reactjs.org/
[5]: https://standardjs.com
[6]: https://docs.feathersjs.com/api/configuration.html
[7]: https://docs.feathersjs.com/
[8]: https://firebase.google.com/docs/functions
[9]: https://xd.adobe.com/spec/d8902b2f-721b-4006-5b21-ffd8e4e42993-aea1/
[10]: http://atomicdesign.bradfrost.com/chapter-2/
[11]: https://github.com/developit/unistore
[12]: https://sass-lang.com/
[13]: https://mockaroo.com/
[14]: https://jestjs.io/docs/en/snapshot-testing
[15]: https://jsdoc.app/
[16]: ./pull_request_template.md
