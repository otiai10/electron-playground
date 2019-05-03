# Electron Google OAuth Example App



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
