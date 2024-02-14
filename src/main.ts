import { enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { BillSummaryEffects } from './app/+state/effects/bill-summary.effects';
import { AccountSummaryEffects } from './app/+state/effects/account-summary.effects';
import * as Realm from 'realm-web';
import { provideHttpClient } from '@angular/common/http';

const options: Realm.AppConfiguration = {
  id: environment.id,
};
const realm = new Realm.App(options);
const creds = Realm.Credentials.apiKey(environment.key);
realm
  .logIn(creds)
  .then((user) => console.log(user.id))
  .catch((err) => {
    console.error('Failed to log in', err);
  });
export const mongo = realm.currentUser;

// Call the element loader before the bootstrapModule/bootstrapApplication call
defineCustomElements(window);
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideStore(),
    provideStoreDevtools({
      name: 'Personal Finance',
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    provideEffects(BillSummaryEffects, AccountSummaryEffects),
    provideHttpClient(),
  ],
});
