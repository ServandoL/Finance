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
        BillSummaryActions.updateDataSuccess,
        BillSummaryActions.addCategorySuccess,
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
        this.db
          .SubmitBillSummary(action.payload)
          .pipe(map((payload) => BillSummaryActions.submitDataSuccess({ payload }))),
      ),
      catchError((error) => of(BillSummaryActions.submitDataFailure({ error: (error as Error).message }))),
    ),
  );

  updateBillItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BillSummaryActions.updateData),
      switchMap((action) =>
        this.db.UpdateBillSummary(action.payload).pipe(
          map((payload) => BillSummaryActions.updateDataSuccess({ payload })),
          catchError((error) => of(BillSummaryActions.updateDataFailure({ error: (error as Error).message }))),
        ),
      ),
    ),
  );

  deleteBillSummaryItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BillSummaryActions.deleteItem),
      switchMap((action) =>
        this.db.DeleteItem(action.payload).pipe(
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

  addNewCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(BillSummaryActions.addCategory),
      switchMap((action) =>
        this.db.AddNewCategory(action.payload).pipe(
          map((payload) => BillSummaryActions.addCategorySuccess({ payload })),
          catchError((error) => of(BillSummaryActions.addCategoryFailure({ error: (error as Error).message }))),
        ),
      ),
    ),
  );
}
