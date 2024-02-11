import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { MockServiceService } from 'src/app/services/mock.service';
import { AccountSummaryActions } from '../actions/account-summary.actions';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryEffects {
  constructor(
    private actions$: Actions,
    private mock: MockServiceService,
  ) {}

  getAccountSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountSummaryActions.getData),
      switchMap(() =>
        this.mock.GetAccountSummary().pipe(
          map((payload) => AccountSummaryActions.getDataSuccess({ payload })),
          catchError((error) => of(AccountSummaryActions.getDataFailure({ error: (error as Error).message }))),
        ),
      ),
    ),
  );
}
