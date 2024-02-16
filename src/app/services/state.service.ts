import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BillSummaryActions } from '../+state/actions/bill-summary.actions';
import { AppState } from '../+state';
import { AccountSummaryActions } from '../+state/actions/account-summary.actions';
import { BillSummary, ISubmitRequest } from '../interfaces';
import { NewCategoryRequest } from './service.interface';

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
  UpdateBillItems(payload: ISubmitRequest[]): void {
    this.store.dispatch(BillSummaryActions.updateData({ payload }));
  }
  DeleteBillSummaryItem(payload: BillSummary): void {
    this.store.dispatch(BillSummaryActions.deleteItem({ payload }));
  }
  DeleteBillSummaryCategory(payload: string): void {
    this.store.dispatch(BillSummaryActions.deleteCategory({ payload }));
  }
  AddNewCategory(payload: NewCategoryRequest) {
    this.store.dispatch(BillSummaryActions.addCategory({ payload }));
  }

  UpdateAccountSummaryTotal(payload: number) {
    this.store.dispatch(AccountSummaryActions.updateAccountTotal({ payload }));
  }
  GetAccountSummary(): void {
    this.store.dispatch(AccountSummaryActions.getData());
  }
  ResetAccountSummary(): void {
    this.store.dispatch(AccountSummaryActions.resetData());
  }
}
