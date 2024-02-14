import { Injectable } from '@angular/core';
import { BillSummary, ISubmitRequest } from 'src/app/interfaces/BillSummary';
import { Observable, from, map } from 'rxjs';
import { AccountSummary } from '../interfaces';
import {
  AccountSummaryMongo,
  AddBillItemMongo,
  BillSummaryMongo,
  DeleteBillItemMongo,
  MongoService,
  UpdateBillItemsMongo,
} from './service.interface';
import { mongo } from 'src/main';

@Injectable({
  providedIn: 'root',
})
export class DbService implements MongoService {
  constructor() {}
  UpdateBillSummary(payload: ISubmitRequest[]): Observable<UpdateBillItemsMongo[]> {
    const input = payload.map((item) => item.bills).flat();
    return from(this.UpdateBillItems(input)) as unknown as Observable<UpdateBillItemsMongo[]>;
  }

  DeleteCategory(payload: string): Observable<BillSummary[]> {
    throw new Error('Not Implemented');
  }

  DeleteItem(payload: BillSummary): Observable<DeleteBillItemMongo> {
    return from(this.DeleteBillItem([payload])) as unknown as Observable<DeleteBillItemMongo>;
  }

  SubmitBillSummary(payload: ISubmitRequest[]): Observable<AddBillItemMongo> {
    return from(this.AddBillSummaryItem(payload[0].bills)) as unknown as Observable<AddBillItemMongo>;
  }

  GetAccountSummary(): Observable<AccountSummary[]> {
    return from(this.FetchAccountSummary()).pipe(
      map((data: unknown) => this.transformAccountSummary(data as AccountSummaryMongo)),
    ) as unknown as Observable<AccountSummary[]>;
  }

  GetBillSummary(): Observable<BillSummary[]> {
    return from(this.FetchBillSummary()).pipe(
      map((data: unknown) => (data as BillSummaryMongo).result),
    ) as unknown as Observable<BillSummary[]>;
  }
  private transformAccountSummary(data: AccountSummaryMongo): BillSummary[] {
    const out: BillSummary[] = [];
    Object.entries(data).forEach(([key, value]) => {
      out.push(value);
    });
    return out;
  }
  private async UpdateBillItems(item: BillSummary[]) {
    return await mongo?.callFunction('UpdateBillItems', item);
  }
  private async DeleteBillItem(item: BillSummary[]) {
    return await mongo?.callFunction('DeleteBillItem', item);
  }
  private async AddBillSummaryItem(item: BillSummary[]) {
    return await mongo?.callFunction('AddBillItem', item);
  }
  private async FetchBillSummary() {
    return await mongo?.callFunction('GetBillSummary');
  }
  private async FetchAccountSummary() {
    return await mongo?.callFunction('GetAccountSummary');
  }
}
