import { Observable } from 'rxjs';
import { AccountSummary, BillSummary, ISubmitRequest } from '../interfaces';

export interface MongoService {
  DeleteCategory(payload: string): void;

  DeleteItem(payload: BillSummary): Observable<DeleteBillItemMongo>;

  SubmitBillSummary(payload: ISubmitRequest[]): Observable<AddBillItemMongo>;

  UpdateBillSummary(payload: ISubmitRequest[]): Observable<UpdateBillItemsMongo[]>;

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

export interface AddBillItemMongo {
  insertedId: unknown;
}

export interface DeleteBillItemMongo {
  deletedCount: number;
}

export interface UpdateBillItemsMongo {
  matchedCount: number;
  modifiedCount: number;
}
