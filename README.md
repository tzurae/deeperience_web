# Express-React-HMR-Boilerplate

[![Build Status](https://travis-ci.org/gocreating/express-react-hmr-boilerplate.svg?branch=dev)](https://travis-ci.org/gocreating/express-react-hmr-boilerplate)
[![Dependency Status](https://david-dm.org/gocreating/express-react-hmr-boilerplate.svg)](https://david-dm.org/gocreating/express-react-hmr-boilerplate)

This is a boilerplate for scaffolding MERN stack projects with livereload feature supported.

## Demo

<https://express-react-hmr-boilerplate.herokuapp.com/>

## Techniques

- Nodejs + Express
- Reactjs + Redux + Redux-Thunk + React-Router + Redux-Form + React-Intl
- Mongodb + Mongoose + MongoLab
- Livereload
- Server-Side Rendering (SSR) & State Fetching (Isomorphic)
- Webpack + Code Splitting
- CSS Modules
- ES6/7 + Babel
- Travis CI Template
- Heroku Deploy Script
- Examples
  - Simple Todo List App
  - Passport + Jwt Authentication
  - i18n
  - Upload avatar
  - Ajax progress bar
- React Native

## Installation

```
npm install -g gulp
npm install
```

## Integrate with MongoDB (**Required**)

Most services this boilerplate provides rely on mongoDB. You must config your own mongoDB URIs.

1. Add `configs/project/mongo/credential.js`

  The file is where mongoDB URIs are stored. Here is the example template:

  ```js
  module.exports = {
    development: 'mongodb://<user>:<password>@<domain>:<port>/<db_development>',
    test: 'mongodb://<user>:<password>@<domain>:<port>/<db_test>',
    production: 'mongodb://<user>:<password>@<domain>:<port>/<db_production>',
  };
  ```

2. Done

## Integrate with [Firebase](https://console.firebase.google.com/) (Optional)

Firebase provides 5GB/user file storage for [free](https://firebase.google.com/pricing/) and is backed up by google cloud storage service. Thus we use firebase storage `for free` to host user avatars.

1. Follow the doc [Add Firebase to your Server](https://firebase.google.com/docs/server/setup)
2. Save the credential file to `configs/project/firebase/credential.json`
3. Update `configs/project/firebase/client.js`

  - Open [Firebase console](https://console.firebase.google.com/)
  - Enter your app
  - Go to `Auth` page
  - Click on `網路設定` and get your configuration
  - Replace the following part with your configuration

    ```
    var config = {
      apiKey: '<your-api-key>',
      authDomain: '<your-auth-domain>',
      databaseURL: '<your-database-url>',
      storageBucket: '<your-storage-bucket>'
    };
    ```
4. Update `configs/project/client.js` and `configs/project/server.js`

  Make sure there is a `firebase` entry in each file:
  ```js
  // configs/project/client.js
  module.exports = {
    // ...
    firebase: require('./firebase/client'),
    // ...
  };
  ```

  ```js
  // configs/project/server.js
  module.exports = {
    // ...
    firebase: require('./firebase/credential.json'),
    // ...
  };
  ```
5. Setup firebase storage security rule

  We follow the doc [Secure User Data](https://firebase.google.com/docs/storage/security/user-security), and use the following rules to restrict user permissions.

  > Don't forget to change the project name into your own

  ```
  service firebase.storage {
    match /b/express-react-hmr-boilerplate.appspot.com/o {
      match /{env}/{userId}/avatar.jpg {
      	allow read;
        allow write: if request.auth.uid == userId;
      }
    }
  }
  ```

## Build & Run

For development:
```
gulp
```

For production:
```
gulp build:production
npm start
```

## Test

```
npm test
```

## Deploy on [Heroku](https://www.heroku.com/)

Please login heroku first, and run the command

```
gulp build:production
gulp deploy [--app=<heroku_app_name>] [--create]
```

### Options

- `-a`, `--app`

  Specify new or existing app name of heroku. Default will be package name inside `package.json`.

- `-c`, `--create`

  If you want to create new app on heroku, please use this switch.

## React Native

For development, just use:

```bash
npm run android
```

For production or distributing APK, please refer to the setup part of [Generating Signed APK](https://facebook.github.io/react-native/docs/signed-apk-android.html). You can use helper scripts below:

```bash
npm run android-keygen
npm run release-android
npm run install-android
```

## Setup a new project

Follow the commands below to integrate this boilerplate into your own project as `mirror` branch.

``` bash
cd <your_project>
git flow init -d
git remote add -t master mirror https://github.com/gocreating/express-react-hmr-boilerplate.git
git fetch mirror master:mirror # git fetch <remote> <rbranch>:<lbranch>

git flow feature start mirror
git merge --no-ff --no-edit mirror
git flow feature finish mirror

# git flow feature start tune-mirror
# tune the boilerplate to suit your own project
# git flow feature finish tune-mirror

git remote add origin <your_project.git>
git push -u origin master
```

Once there is a new version of this boilerplate, you can upgrade with the following commands

```
git checkout mirror
git pull mirror mirror
git checkout develop
git flow feature start upgrade-mirror
git merge --no-ff --no-edit mirror
git flow feature finish upgrade-mirror
```

## Roadmap

### v1.0

- [x] [Travis Testing](https://github.com/gocreating/express-react-hmr-boilerplate/commit/e5273694dd5a75305e8a778c0ac660d2e7340916)
- [x] [Disable submit button when form submitting](https://github.com/gocreating/express-react-hmr-boilerplate/commit/88557e47a978238b0a0dee198a7c86f0aa01145a)
- [x] [Asynchronous redux-form validation (detect duplicate email)](https://github.com/gocreating/express-react-hmr-boilerplate/commit/4eff5b583b6ab3a70f36441d77805550c4224b14)
- [x] [Error handling](https://github.com/gocreating/express-react-hmr-boilerplate/commit/ca4db0d594e13950e46b32c5458e1a695136c0c3)
  - reference: [Checklist: Best Practices of Node.JS Error Handling](http://goldbergyoni.com/checklist-best-practices-of-node-js-error-handling/)
- [x] [PM2 Integration](https://github.com/gocreating/express-react-hmr-boilerplate/commit/e427d7c3a9efea971557b0a2d7a6397b43ca4760)
- [x] [Rename resource as resource`s`](https://github.com/gocreating/express-react-hmr-boilerplate/commit/039baadff0bdb22e5340153a2a9fe1935f87b7d9)
- [ ] Pagination Mechanism
- [x] Bug Fix for Intl
  - reference:
    1. [Changing locale and FormattedMessage not updated instantly](https://github.com/yahoo/react-intl/issues/371)
    2. [react-redux API docs](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
- [ ] Google analytics
- [ ] Add License
- [ ] User Roles

### v1.0+

- [ ] Social Login
- [ ] Todo#Update API & Todo#Edit Functionality
- [ ] Facebook Messenger Bot Example
- [ ] [Stripe](https://stripe.com/) Payment System + Donation Button Example
- [ ] Mail System
- [ ] Automatically Refresh Token
- [ ] Admin
