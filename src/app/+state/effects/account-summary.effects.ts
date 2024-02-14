import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AccountSummaryActions } from '../actions/account-summary.actions';
import { DbService } from 'src/app/services/db.service';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryEffects {
  constructor(
    private actions$: Actions,
    private db: DbService,
  ) {}

  getAccountSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountSummaryActions.getData),
      switchMap(() =>
        this.db.GetAccountSummary().pipe(
          map((payload) => AccountSummaryActions.getDataSuccess({ payload })),
          catchError((error) => of(AccountSummaryActions.getDataFailure({ error: (error as Error).message }))),
        ),
      ),
    ),
  );
}
