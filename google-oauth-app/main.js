const { app, BrowserWindow, ipcMain } = require('electron');
const { OAuth2Client } = require('google-auth-library');

// Check `secrets.example.js` and cp to `secrets.js`
const { OAUTH_CLIENT } = require('./secrets');

app.on('ready', () => {
    const topWindow = new BrowserWindow({
        title: 'YouTube Search App',
        webPreferences: { nodeIntegration: true },
    });
    topWindow.loadURL(`file://${__dirname}/top.html`);

    ipcMain.on('auth-start', async () => {
        // 0) Initialize OAuth Client
        const client = initOAuthClient();
        const url = client.generateAuthUrl({
            scope: ['https://www.googleapis.com/auth/youtube.readonly'],
        });
        // 1) Create another window and get code.
        const auth = new BrowserWindow({ x: 0, y: 0, useContentSize: true });
        const code = await getOAuthCodeByInteraction(auth, url);
        // 2) Exchange OAuth code for tokens.
        const response = await client.getToken(code);
        // 3) Notify top window auth-success with tokens.
        topWindow.send('auth-success', response.tokens);
    });
});

/**
 * Initialize OAuth client with secret values.
 */
const initOAuthClient = () => {
    return new OAuth2Client({
        clientId: OAUTH_CLIENT.client_id,
        clientSecret: OAUTH_CLIENT.client_secret,
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
    });
};

/**
 * This method opens a new window to let users log-in the OAuth provider service,
 * grant permissions to OAuth client service (this application),
 * and returns OAuth code which can be exchanged for the real API access keys.
 * 
 * @param {*} interactionWindow a window in which the user will have interaction with OAuth provider service.
 * @param {*} authPageURL an URL of OAuth provider service, which will ask the user grants permission to us.
 * @returns {Promise<string>}
 */
const getOAuthCodeByInteraction = (interactionWindow, authPageURL) => {
    interactionWindow.loadURL(authPageURL);
    return new Promise((resolve, reject) => {
        const onclosed = () => {
            reject('Interaction ended intentionally ;(');
        };
        interactionWindow.on('closed', onclosed);
        interactionWindow.on('page-title-updated', (ev) => {
            const url = new URL(ev.sender.getURL());
            if (url.searchParams.get('approvalCode')) {
                interactionWindow.removeListener('closed', onclosed);
                interactionWindow.close();
                return resolve(url.searchParams.get('approvalCode'));
            }
            if ((url.searchParams.get('response') || '').startsWith('error=')) {
                interactionWindow.removeListener('closed', onclosed);
                interactionWindow.close();
                return reject(url.searchParams.get('response'));
            }
        });
    });
};

app.on('window-all-closed', () => {
    app.quit();
});
