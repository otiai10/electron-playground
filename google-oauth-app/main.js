const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
    const topWindow = new BrowserWindow({
        title: 'YouTube Search App',
        webPreferences: { nodeIntegration: true },
    });
    topWindow.loadURL(`file://${__dirname}/top.html`);

    ipcMain.on('auth-start', async () => {
        // 1) Create another window and get code.
        // 2) Exchange OAuth code for tokens.
        // 3) Notify top window auth-success with tokens.

        // TODO: Implement
        setTimeout(() => {
            topWindow.webContents.send('auth-success', {
                access_token: 'xxxx',
            });
        }, 3000);

    });
});

app.on('window-all-closed', () => {
    app.quit();
});
