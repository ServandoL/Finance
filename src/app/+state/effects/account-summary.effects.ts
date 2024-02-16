import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AccountSummaryActions } from '../actions/account-summary.actions';
import { DbService } from 'src/app/services/db.service';
import { UpdateAccountSummaryRequest } from 'src/app/interfaces';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import { selectSummary } from '../reducers/account-summary.reducer';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryEffects {
  constructor(
    private actions$: Actions,
    private db: DbService,
    private store: Store<AppState>,
  ) {}

  getAccountSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountSummaryActions.getData, AccountSummaryActions.updateAccountTotalSuccess),
      switchMap(() =>
        this.db.GetAccountSummary().pipe(
          map((payload) => AccountSummaryActions.getDataSuccess({ payload })),
          catchError((error) => of(AccountSummaryActions.getDataFailure({ error: (error as Error).message }))),
        ),
      ),
    ),
  );

  updateAccountTotal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountSummaryActions.updateAccountTotal),
      concatLatestFrom(() => this.store.select(selectSummary)),
      switchMap(([action, state]) => {
        const summaryTotal = state.find((item) => item.type === 'Account Total');
        if (!summaryTotal) return of();
        const input: UpdateAccountSummaryRequest = {
          _id: summaryTotal?._id.toHexString(),
          value: action.payload,
        };
        return this.db.UpdateAccountTotal(input).pipe(
          map((payload) => AccountSummaryActions.updateAccountTotalSuccess({ payload })),
          catchError((error) => of(AccountSummaryActions.getDataFailure({ error: (error as Error).message }))),
        );
      }),
    ),
  );
}
