import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { BillSummary } from 'src/app/interfaces/BillSummary';
import { MockServiceService } from 'src/app/services/mock.service';

@Component({
  selector: 'app-monthly-bills',
  templateUrl: './monthly-bills.component.html',
  styleUrls: ['./monthly-bills.component.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
  providers: [MockServiceService],
})
export class MonthlyBillsComponent {
  importantBills$: Observable<BillSummary[]>;
  creditCards$: Observable<BillSummary[]>;
  subscriptions$: Observable<BillSummary[]>;
  constructor(private mock: MockServiceService) {
    this.importantBills$ = mock.GetBillSummary();
    this.creditCards$ = mock.GetBillSummary();
    this.subscriptions$ = mock.GetBillSummary();
  }

  changeValue(item: BillSummary, value: number) {
    item.value = value;
  }
}
