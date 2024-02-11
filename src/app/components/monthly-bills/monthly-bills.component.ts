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
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, map, take } from 'rxjs';
import { AppState } from 'src/app/+state';
import { selectBills, selectIsLoading } from 'src/app/+state/reducers/bill-summary.reducer';
import { BillSummary, ICategory, ISubmitRequest } from 'src/app/interfaces/BillSummary';
import { StateService } from 'src/app/services/state.service';
import * as IonicIcons from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-monthly-bills',
  templateUrl: './monthly-bills.component.html',
  styleUrls: ['./monthly-bills.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonFabButton,
    IonFab,
    IonInput,
    IonCol,
    IonRow,
    IonGrid,
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
  readonly subs: Subscription[] = [];
  bills$: Observable<Map<string, BillSummary[]>>;
  isLoading$: Observable<boolean>;
  _categories = new BehaviorSubject<ICategory[]>([]);
  constructor(
    private service: StateService,
    private store: Store<AppState>,
  ) {
    addIcons(IonicIcons);
    this.bills$ = this.store.select(selectBills);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  get categories$(): Observable<ICategory[]> {
    return this._categories.asObservable();
  }

  ionViewWillEnter(): void {
    this.service.GetBillSummary();
    this.subs.push(
      this.bills$.subscribe((bills) => {
        const categories = [...bills.keys()].map((key) => {
          const out: ICategory = {
            category: key,
            enable: false,
          };
          return out;
        });
        this._categories.next(categories);
      }),
    );
  }

  ionViewWillLeave(): void {
    this.service.ResetBillSummary();
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  shouldDisable(category: string): boolean {
    return this._categories.value.find((cat) => cat.category === category)?.enable === false;
  }

  handleSubmit() {
    this.bills$
      .pipe(
        take(1),
        map((bills) => {
          const request: ISubmitRequest[] = [];
          bills.forEach((value, key) => {
            const out: ISubmitRequest = {
              category: key,
              bills: [...value],
            };
            request.push(out);
          });
          this.service.SubmitBillSummary(request);
        }),
      )
      .subscribe();
  }

  handleClick(item: BillSummary) {
    item.clicked = true;
  }

  changeValue(item: BillSummary, value: unknown) {
    item.edittedValue = +(value as { detail: { value: number } }).detail.value;
    this.bills$
      .pipe(
        take(1),
        map((bills) => {
          const cat = bills.get(item.category) ?? [];
          if (item.edittedValue === item.value) {
            /**
             * check if we should disable the submit button
             */
            item.edittedValue = null;
            const enabled = this.areNonEditted(cat);
            this.updateCategories(item.category, enabled);
          } else {
            /**
             * check if we should enable the submit button
             */
            const enabled = this.shouldEnableSubmit(cat);
            this.updateCategories(item.category, enabled);
          }
        }),
      )
      .subscribe();
  }
  private updateCategories(category: string, enabled: boolean): void {
    const update = this._categories.value.map((cat) => {
      if (cat.category === category) {
        const out: ICategory = {
          category: category,
          enable: enabled,
        };
        return out;
      }
      return cat;
    });
    this._categories.next(update);
  }

  private shouldEnableSubmit(category: BillSummary[]): boolean {
    return (
      category.some((bill) => bill.edittedValue !== bill.value && bill.edittedValue !== null) && category.length > 0
    );
  }

  private areNonEditted(category: BillSummary[]): boolean {
    return category.every((bill) => bill.edittedValue === null) && category.length > 0;
  }
}
