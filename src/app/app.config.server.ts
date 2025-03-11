import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { SESSION_STORAGE } from './tokens';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: SESSION_STORAGE,
        useFactory: () => ({
        getItem: () => {},
        setItem: () => {},
        removeItem: () => {},
      }),
    },
    provideServerRouting(serverRoutes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
