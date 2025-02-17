import { ApplicationConfig, provideZoneChangeDetection, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { LOCAL_STORAGE } from './tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LOCAL_STORAGE,
      useFactory:(platformId: object) => {
        if (isPlatformServer(platformId)) {
          return {}; // Return an empty object on the server
        }
        return sessionStorage; // Use the browser's sessionStorage
        },
        deps: [PLATFORM_ID],
    },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideClientHydration(withEventReplay())],
    
};
