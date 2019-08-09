# Deployment

Below you'll find instructions on how to deploy to Firebase.

## Overview

[Prerequisites](#prerequisites)  
[Deploy to Firebase](#deploy-to-firebase)  

## Prerequisites

Follow the [Guide to Contributing](CONTRIBUTING.md) for detailed instructions on
development, testing, and making a pull request.

You'll also need to have [Firebase CLI][1] setup.

## Deploy to Firebase

Before deploying, be sure to:

1. Set up [Deploy Targets][2] if necessary
2. Review the [Firebase Launch Checklist][3]

When ready to deploy, you have a few options:

- Run `firebase deploy` in the project directory.
- Run `firebase deploy -m "<DEPLOY_MESSAGE>"` in the project directory.
- Attach `--only functions` or `--only hosting` to deploy **only** our Cloud
  Functions or Hosting configuration.

After the deployment is complete, you'll see something similar to the following in your terminal:

```bash
=== Deploying to '<PROJECT_NAME>'...

i  deploying functions, hosting
Running command: NODE_ENV=production
Running command: npm run lint

> <PACKAGE_NAME>@<VERSION_NUMBER> lint <PROJECT_PATH>
> eslint ./functions/**/**/*.js --fix

✔  functions: Finished running predeploy script.
i  functions: ensuring necessary APIs are enabled...
✔  functions: all necessary APIs are enabled
i  functions: preparing functions directory for uploading...
i  functions: packaged functions (51.61 KB) for uploading
✔  functions: functions folder uploaded successfully
i  hosting[<PROJECT_NAME>]: beginning deploy...
i  hosting[<PROJECT_NAME>]: found <FILE_NUMBER> files in <PUBLIC_DIRECTORY>
✔  hosting[<PROJECT_NAME>]: file upload complete
i  functions: creating Node.js 10 (Beta) function <FUNCTION_NAME>(<REGION>)...
✔  functions[<FUNCTION_NAME>(<REGION>)]: Successful create operation.
Function URL (<FUNCTION_NAME>): https://<REGION>-<PROJECT_NAME>.cloudfunctions.net/<FUNCTION_NAME>
i  hosting[<PROJECT_NAME>]: finalizing version...
✔  hosting[<PROJECT_NAME>]: version finalized
i  hosting[<PROJECT_NAME>]: releasing new version...
✔  hosting[<PROJECT_NAME>]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/<PROJECT_NAME>/overview
Hosting URL: https://<PROJECT_NAME>.firebaseapp.com
```

Your functions will be available from the following URLS:

- `https://<REGION>-<PROJECT_NAME>.cloudfunctions.net`
- `https://<PROJECT_NAME>.firebaseapp.com` (check `rewrites` key in [`firebase.json`][4])
- `https://<PROJECT_NAME>.web.app` (check `rewrites` key in [`firebase.json`][4])

[1]: https://firebase.google.com/docs/cli 
[2]: https://firebase.google.com/docs/cli/targets
[3]: https://firebase.google.com/support/guides/launch-checklist
[4]: ./firebase.json
