# Electron Google OAuth Example App

Allows users to login with Google and gets API access tokens for YouTube Data API.

![Application Image](https://user-images.githubusercontent.com/931554/57120834-da8e3280-6dae-11e9-9ea4-2d7358f7b5cd.png)

# Getting Started

Before all, you need to have

1. A project on [Google Developer Console](https://console.developers.google.com)
    - An OAuth Client application created, including
        - `client_id`
        - `client_secret`
    - See [here](https://developers.google.com/identity/protocols/OAuth2InstalledApp) for more information


then set the values to your `./secrets.js`, copied from `./secrets.example.js`

```sh
cp ./secrets.example.js ./secrets.js
vi ./secrets.js
```

You are all set up. Let's have the app running.

```sh
npm install
npm start
```

# Issues

Please feel free to make issues on https://github.com/otiai10/electron-playground/issues when you find anything wrong. Thanks ;)
