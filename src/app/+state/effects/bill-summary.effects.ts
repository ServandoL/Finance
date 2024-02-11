import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BillSummaryActions } from '../actions/bill-summary.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { MockServiceService } from 'src/app/services/mock.service';

@Injectable({
  providedIn: 'root',
})
export class BillSummaryEffects {
  constructor(
    private actions$: Actions,
    private mock: MockServiceService,
  ) {}

  getBillSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BillSummaryActions.getData),
      switchMap(() =>
        this.mock.GetBillSummary().pipe(
          map((payload) => BillSummaryActions.getDataSuccess({ payload })),
          catchError((error) => of(BillSummaryActions.getDataFailure({ error: (error as Error).message }))),
        ),
      ),
    ),
  );
}
