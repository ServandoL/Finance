import { Injectable } from '@angular/core';
import { BillSummary, ISubmitRequest } from 'src/app/interfaces/BillSummary';
import { Observable, from, map } from 'rxjs';
import { AccountSummary } from '../interfaces';
import { AccountSummaryMongo, BillSummaryMongo, MongoService } from './service.interface';
import { mongo } from 'src/main';

@Injectable({
  providedIn: 'root',
})
export class DbService implements MongoService {
  constructor() {}

  DeleteCategory(payload: string): Observable<BillSummary[]> {
    throw new Error('Not Implemented');
  }

  DeleteItem(payload: BillSummary): Observable<BillSummary[]> {
    throw new Error('Not Implemented');
  }

  SubmitBillSummary(payload: ISubmitRequest[]): Observable<BillSummary[]> {
    throw new Error('Not Implemented');
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
  private async FetchBillSummary() {
    return await mongo?.callFunction('GetBillSummary');
  }
  private async FetchAccountSummary() {
    return await mongo?.callFunction('GetAccountSummary');
  }
}
