import { Observable } from 'rxjs';
import { AccountSummary, BillSummary, ISubmitRequest, UpdateAccountSummaryRequest } from '../interfaces';

export interface MongoService {
  DeleteCategory(payload: string): Observable<MongoDelete>;

  DeleteItem(payload: BillSummary): Observable<DeleteBillItemMongo>;

  SubmitBillSummary(payload: ISubmitRequest[]): Observable<AddBillItemMongo>;

  UpdateBillSummary(payload: ISubmitRequest[]): Observable<UpdateItemMongo[]>;

  GetAccountSummary(): Observable<AccountSummary[]>;

  GetBillSummary(): Observable<BillSummary[]>;

  UpdateAccountTotal(payload: UpdateAccountSummaryRequest): Observable<UpdateItemMongo>;

  AddNewCategory(payload: NewCategoryRequest): Observable<AddBillItemMongo>;
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

export interface NewCategoryRequest {
  name: string;
  value: number;
  category: string;
  updatedTms: Date;
}

export interface MongoDelete {
  acknowledged: boolean;
  deletedCount: number;
}
