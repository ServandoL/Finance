import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { billSummaryFeature, BillSummaryState } from './reducers/bill-summary.reducer';
import { AccountSummaryState, accountSummaryFeature } from './reducers/account-summary.reducer';

export interface AppState {
  billSummary: BillSummaryState;
  accountSummary: AccountSummaryState;
}

export const reducers: ActionReducerMap<AppState> = {
  billSummary: billSummaryFeature.reducer,
  accountSummary: accountSummaryFeature.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
