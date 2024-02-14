import { Observable } from 'rxjs';
import { AccountSummary, BillSummary, ISubmitRequest } from '../interfaces';

export interface MongoService {
  DeleteCategory(payload: string): Observable<BillSummary[]>;

  DeleteItem(payload: BillSummary): Observable<BillSummary[]>;

  SubmitBillSummary(payload: ISubmitRequest[]): Observable<BillSummary[]>;

  GetAccountSummary(): Observable<AccountSummary[]>;

  GetBillSummary(): Observable<BillSummary[]>;
}

export interface BillSummaryMongo {
  result: BillSummary[];
}

export interface AccountSummaryMongo {
  monthly: AccountSummary;
  accountTotal: AccountSummary;
}
