import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BillSummaryActions } from '../actions/bill-summary.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { MockServiceService } from 'src/app/services/mock.service';
import { DbService } from 'src/app/services/db.service';

@Injectable({
  providedIn: 'root',
})
export class BillSummaryEffects {
  constructor(
    private actions$: Actions,
    private mock: MockServiceService,
    private db: DbService,
  ) {}

  getBillSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BillSummaryActions.getData,
        BillSummaryActions.submitDataSuccess,
        BillSummaryActions.deleteItemSuccess,
        BillSummaryActions.deleteCategorySuccess,
      ),
      switchMap(() =>
        this.db.GetBillSummary().pipe(
          map((payload) => BillSummaryActions.getDataSuccess({ payload })),
          catchError((error) => of(BillSummaryActions.getDataFailure({ error: (error as Error).message }))),
        ),
      ),
    ),
  );

  submitBillSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BillSummaryActions.submitData),
      switchMap((action) =>
        this.mock
          .SubmitBillSummary(action.payload)
          .pipe(map((payload) => BillSummaryActions.submitDataSuccess({ payload }))),
      ),
      catchError((error) => of(BillSummaryActions.submitDataFailure({ error: (error as Error).message }))),
    ),
  );

  deleteBillSummaryItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BillSummaryActions.deleteItem),
      switchMap((action) =>
        this.mock.DeleteItem(action.payload).pipe(
          map((payload) => BillSummaryActions.deleteItemSuccess({ payload })),
          catchError((error) => of(BillSummaryActions.deleteItemFailure({ error: (error as Error).message }))),
        ),
      ),
    ),
  );

  deleteBillSummaryCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(BillSummaryActions.deleteCategory),
      switchMap((action) =>
        this.mock.DeleteCategory(action.payload).pipe(
          map((payload) => BillSummaryActions.deleteCategorySuccess({ payload })),
          catchError((error) => of(BillSummaryActions.deleteCategoryFailure({ error: (error as Error).message }))),
        ),
      ),
    ),
  );
}
