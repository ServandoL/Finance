import { Injectable } from '@angular/core';
import { BillSummary, ISubmitRequest } from 'src/app/interfaces/BillSummary';
import { faker } from '@faker-js/faker';
import { Observable, delay, of } from 'rxjs';
import { AccountSummary, UpdateAccountSummaryRequest } from '../interfaces';
import {
  AddBillItemMongo,
  DeleteBillItemMongo,
  MongoService,
  NewCategoryRequest,
  UpdateItemMongo,
} from './service.interface';
import { BSON } from 'realm-web';

@Injectable({
  providedIn: 'root',
})
export class MockServiceService implements MongoService {
  constructor() {}
  AddNewCategory(payload: NewCategoryRequest): Observable<AddBillItemMongo> {
    throw new Error('Method not implemented.');
  }
  UpdateAccountTotal(payload: UpdateAccountSummaryRequest): Observable<UpdateItemMongo> {
    throw new Error('Method not implemented.');
  }

  DeleteCategory(payload: string) {
    console.log('deleted category', payload);
    return this.GetBillSummary();
  }

  DeleteItem(payload: BillSummary): Observable<DeleteBillItemMongo> {
    console.log('deleted', payload);
    return of({ deletedCount: 1 });
  }

  SubmitBillSummary(payload: ISubmitRequest[]): Observable<AddBillItemMongo> {
    console.log('Submitted', payload);
    return of({ insertedId: '' });
  }

  UpdateBillSummary(payload: ISubmitRequest[]): Observable<UpdateItemMongo[]> {
    console.log(payload);
    return of([]);
  }

  GetAccountSummary(): Observable<AccountSummary[]> {
    const total: AccountSummary = {
      _id: new BSON.ObjectId(),
      total: +faker.finance.amount({ min: 6000, max: 20000, dec: 2 }),
      type: 'Account Total',
      updatedTms: faker.date.anytime(),
    };
    const monthly: AccountSummary = {
      _id: new BSON.ObjectId(),
      total: +faker.finance.amount({ min: 1000, max: 3000, dec: 2 }),
      type: 'Monthly Bill',
      updatedTms: faker.date.anytime(),
    };
    return of([total, monthly]).pipe(delay(1000));
  }

  GetBillSummary(itemCount = 5): Observable<BillSummary[]> {
    const categoryCount = 3;
    const cat1: BillSummary[] = [];
    const cat2: BillSummary[] = [];
    const cat3: BillSummary[] = [];
    for (let i = 0; i < categoryCount; i++) {
      const cat = faker.company.buzzNoun();
      for (let j = 0; j < itemCount; j++) {
        const out = this.generateImportantBills(cat);
        if (i === 0) {
          cat1.push(out);
        } else if (i === 1) {
          cat2.push(out);
        } else {
          cat3.push(out);
        }
      }
    }
    return of([...cat1, ...cat2, ...cat3]).pipe(delay(1000));
  }
  private generateImportantBills(category: string): BillSummary {
    const out: BillSummary = {
      name: faker.commerce.productName(),
      value: +faker.finance.amount({ min: 100, max: 500, dec: 2 }),
      category,
      updatedTms: faker.date.anytime(),
      clicked: false,
      edittedValue: null,
    };
    return out;
  }
}
