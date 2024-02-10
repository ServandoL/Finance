import { Injectable } from '@angular/core';
import { BillSummary, BillType } from 'src/app/interfaces/BillSummary';
import { faker } from '@faker-js/faker';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockServiceService {
  constructor() {}

  GetBillSummary(count = 5): Observable<BillSummary[]> {
    const out: BillSummary[] = [];
    for (let i = 0; i < count; i++) {
      const bill = this.generateImportantBills();
      out.push(bill);
    }
    return of(out).pipe(delay(1000));
  }
  private generateImportantBills(): BillSummary {
    const out: BillSummary = {
      name: faker.commerce.productName(),
      value: +faker.finance.amount({ min: 100, max: 500, dec: 2 }),
      clicked: false,
    };
    return out;
  }
}
