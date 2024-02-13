import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BillSummaryActions } from '../+state/actions/bill-summary.actions';
import { AppState } from '../+state';
import { AccountSummaryActions } from '../+state/actions/account-summary.actions';
import { BillSummary, ISubmitRequest } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private store: Store<AppState>) {}

  GetBillSummary(): void {
    this.store.dispatch(BillSummaryActions.getData());
  }
  ResetBillSummary(): void {
    this.store.dispatch(BillSummaryActions.resetData());
  }
  SubmitBillSummary(payload: ISubmitRequest[]): void {
    this.store.dispatch(BillSummaryActions.submitData({ payload }));
  }
  DeleteBillSummaryItem(payload: BillSummary): void {
    this.store.dispatch(BillSummaryActions.deleteItem({ payload }));
  }
  DeleteBillSummaryCategory(payload: string): void {
    this.store.dispatch(BillSummaryActions.deleteCategory({ payload }));
  }

  GetAccountSummary(): void {
    this.store.dispatch(AccountSummaryActions.getData());
  }
  ResetAccountSummary(): void {
    this.store.dispatch(AccountSummaryActions.resetData());
  }
}