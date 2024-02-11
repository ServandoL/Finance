import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { provideState } from '@ngrx/store';
import { accountSummaryFeature } from '../+state/reducers/account-summary.reducer';
import { billSummaryFeature } from '../+state/reducers/bill-summary.reducer';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'summary',
        loadComponent: () => import('./account-summary/tab1.page').then((m) => m.Tab1Page),
        providers: [provideState(accountSummaryFeature)],
      },
      {
        path: 'credit-card-tracker',
        loadComponent: () => import('./credit-card-tracker/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'budget-overview',
        loadComponent: () => import('./budget-overview/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'monthly-bills',
        loadComponent: () =>
          import('../components/monthly-bills/monthly-bills.component').then((m) => m.MonthlyBillsComponent),
        providers: [provideState(billSummaryFeature)],
      },
      {
        path: '',
        redirectTo: '/tabs/summary',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/summary',
    pathMatch: 'full',
  },
];
