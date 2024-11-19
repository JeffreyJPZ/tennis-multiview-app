import type {AppModule} from '../AppModule.js';
import {ModuleContext} from '../ModuleContext.js';
import {ipcMain, BrowserWindow} from 'electron';
import {Channel} from '@vite-electron-builder/preload';

export class AuthenticationModule implements AppModule {
    readonly #authUrl: string;
    readonly #redirectUrl: string;
    readonly #tokens: Set<string>;

    constructor(authUrl: string, redirectUrl: string, tokens: Set<string>) {
        this.#authUrl = authUrl;
        this.#redirectUrl = redirectUrl;
        this.#tokens = structuredClone(tokens);
    }
  
    async enable({app}: ModuleContext): Promise<void> {
        await app.whenReady();
        this.registerInvokableHandlers();
    }

    private registerInvokableHandlers() {
        const login: Channel = 'auth:login';
        ipcMain.handle(login, () => this.getTokens());
    }

    private async getTokens() {
        const win = new BrowserWindow({
            width: 800,
            height: 800,
        });
        await win.loadURL(this.#authUrl);
        win.show();
        win.focus();

        const allCookies = await this.getLoggedInCookies(win, this.#redirectUrl);

        win.destroy();

        const tokens = allCookies.filter((cookie) => this.#tokens.has(cookie.name));

        if (tokens.length === this.#tokens.size) {
            return tokens;
        }
        return 'No tokens were found.';
    }

    private getLoggedInCookies(win: BrowserWindow, url: string): Promise<Electron.Cookie[]> {
        return new Promise((resolve) => {
          const webContents = win.webContents;

          // Wait for redirect from login page to finish before getting cookies
          webContents.on('did-navigate', async () => {
              const ses = win.webContents.session;
              const cookies = await ses.cookies.get({url: url});
              resolve(cookies);
          });
        });
    }
}

export function createAuthenticationModule(...args: ConstructorParameters<typeof AuthenticationModule>) {
    return new AuthenticationModule(...args);
}