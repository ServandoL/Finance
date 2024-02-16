import { Observable } from 'rxjs';
import { AccountSummary, BillSummary, ISubmitRequest, UpdateAccountSummaryRequest } from '../interfaces';

export interface MongoService {
  DeleteCategory(payload: string): void;

  DeleteItem(payload: BillSummary): Observable<DeleteBillItemMongo>;

  SubmitBillSummary(payload: ISubmitRequest[]): Observable<AddBillItemMongo>;

  UpdateBillSummary(payload: ISubmitRequest[]): Observable<UpdateItemMongo[]>;

  GetAccountSummary(): Observable<AccountSummary[]>;

  GetBillSummary(): Observable<BillSummary[]>;

  UpdateAccountTotal(payload: UpdateAccountSummaryRequest): Observable<UpdateItemMongo>;
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

export interface UpdateItemMongo {
  matchedCount: number;
  modifiedCount: number;
}