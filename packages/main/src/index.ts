import type {AppInitConfig} from './AppInitConfig.js';
import {createModuleRunner} from './ModuleRunner.js';
import {disallowMultipleAppInstance} from './modules/SingleInstanceApp.js';
import {createWindowManagerModule} from './modules/WindowManager.js';
import {terminateAppOnLastWindowClose} from './modules/ApplicationTerminatorOnLastWindowClose.js';
import {hardwareAccelerationMode} from './modules/HardwareAccelerationModule.js';
import {autoUpdater} from './modules/AutoUpdater.js';
import {allowInternalOrigins} from './modules/BlockNotAllowedOrigins.js';
import {allowExternalUrls} from './modules/ExternalUrls.js';
import {createAuthenticationModule} from './modules/AuthenticationModule.js';


export async function initApp(initConfig: AppInitConfig) {
  const moduleRunner = createModuleRunner()
    // Authentication
    .init(createAuthenticationModule(
      'https://sso.tennistv.com/auth/realms/TennisTV/protocol/openid-connect/auth?' +
      'client_id=tennis-tv-web&' +
      'redirect_uri=https%3A%2F%2Fwww.tennistv.com&' +
      'response_mode=fragment&' +
      'response_type=code&' +
      'scope=openid',
      'https://www.tennistv.com',
      new Set(['refresh_token', 'access_token'])
    ))
    .init(createWindowManagerModule({initConfig, openDevTools: import.meta.env.DEV}))
    .init(disallowMultipleAppInstance())
    .init(terminateAppOnLastWindowClose())
    .init(hardwareAccelerationMode({enable: false}))
    .init(autoUpdater())

    // Install DevTools extension if needed
    // .init(chromeDevToolsExtension({extension: 'VUEJS3_DEVTOOLS'}))

    // Security
    .init(allowInternalOrigins(
      new Set(initConfig.renderer instanceof URL
        ? [
          initConfig.renderer.origin,
          'https://sso.tennistv.com',
          'https://tennistv.com',
          'https://www.tennistv.com',
        ] 
        : []),
    ))
    .init(allowExternalUrls(
      new Set(
        initConfig.renderer instanceof URL
          ? [
            'https://vite.dev',
            'https://developer.mozilla.org',
            'https://solidjs.com',
            'https://qwik.dev',
            'https://lit.dev',
            'https://react.dev',
            'https://preactjs.com',
            'https://www.typescriptlang.org',
            'https://vuejs.org',
          ]
          : [],
      )),
    );

  await moduleRunner;
}
