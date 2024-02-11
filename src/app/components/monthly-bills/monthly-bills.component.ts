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
  IonButton,
  IonLoading,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/+state';
import { selectBills, selectIsLoading } from 'src/app/+state/reducers/bill-summary.reducer';
import { BillSummary } from 'src/app/interfaces/BillSummary';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-monthly-bills',
  templateUrl: './monthly-bills.component.html',
  styleUrls: ['./monthly-bills.component.scss'],
  standalone: true,
  imports: [
    IonLoading,
    IonButton,
    IonLabel,
    IonItem,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
  ],
  providers: [StateService],
})
export class MonthlyBillsComponent implements ViewWillEnter, ViewWillLeave {
  bills$: Observable<Map<string, BillSummary[]>>;
  isLoading$: Observable<boolean>;
  constructor(
    private service: StateService,
    private store: Store<AppState>,
  ) {
    this.bills$ = this.store.select(selectBills);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  ionViewWillEnter(): void {
    this.service.GetBillSummary();
  }

  ionViewWillLeave(): void {
    this.service.ResetBillSummary();
  }

  changeValue(item: BillSummary, value: number) {
    item.value = value;
  }
}
