import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
  IonModal,
  IonButtons,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonActionSheet,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, map, take } from 'rxjs';
import { AppState } from 'src/app/+state';
import { selectBills, selectIsLoading } from 'src/app/+state/reducers/bill-summary.reducer';
import {
  BillSummary,
  ButtonActionType,
  DeleteAction,
  ICategory,
  ISubmitRequest,
  UpdateItemForm,
} from 'src/app/interfaces/BillSummary';
import { StateService } from 'src/app/services/state.service';
import * as IonicIcons from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-monthly-bills',
  templateUrl: './monthly-bills.component.html',
  styleUrls: ['./monthly-bills.component.scss'],
  standalone: true,
  imports: [
    IonActionSheet,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonButtons,
    IonModal,
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
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [StateService],
})
export class MonthlyBillsComponent implements ViewWillEnter, ViewWillLeave {
  @ViewChild(IonModal) modal: IonModal | undefined;
  readonly subs: Subscription[] = [];
  readonly PROCESS_MESSAGE = 'Processing your request...';
  readonly FETCH_MESSAGE = 'Fetching your data...';
  bills$: Observable<Map<string, BillSummary[]>>;
  isLoading$: Observable<boolean>;
  updateForm: FormGroup<UpdateItemForm>;
  _categories = new BehaviorSubject<ICategory[]>([]);
  _toggleModal = new BehaviorSubject<boolean>(false);
  _categoryToAdd = new BehaviorSubject<string>('');
  _loadingMessage = new BehaviorSubject<string>(this.FETCH_MESSAGE);
  _toggleActionSheet = new BehaviorSubject<boolean>(false);
  _categoryToDelete = new BehaviorSubject<string>('');
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  constructor(
    private service: StateService,
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {
    addIcons(IonicIcons);
    this.bills$ = this.store.select(selectBills);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.updateForm = this.fb.nonNullable.group({
      description: ['', Validators.required],
      value: [0, Validators.required],
    });
  }

  get loadingMessage$(): Observable<string> {
    return this._loadingMessage.asObservable();
  }

  get categories$(): Observable<ICategory[]> {
    return this._categories.asObservable();
  }

  get toggleModal$(): Observable<boolean> {
    return this._toggleModal.asObservable();
  }

  get categoryToAdd$(): Observable<string> {
    return this._categoryToAdd.asObservable();
  }

  get form(): UpdateItemForm {
    return this.updateForm.controls;
  }

  get toggleActionSheet$(): Observable<boolean> {
    return this._toggleActionSheet.asObservable();
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
        this._loadingMessage.next(this.FETCH_MESSAGE);
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

  deleteItem(item: BillSummary) {
    this._loadingMessage.next(this.PROCESS_MESSAGE);
    this.service.DeleteBillSummaryItem(item);
  }

  handleAddItem() {
    this.bills$
      .pipe(
        take(1),
        map((bills) => {
          const cat = this._categoryToAdd.value;
          const update: BillSummary = {
            name: this.form.description.value,
            value: this.form.value.value,
            category: cat,
            updatedTms: new Date(),
            clicked: false,
            edittedValue: null,
          };
          const request: ISubmitRequest = {
            category: cat,
            bills: [update],
          };
          this.service.SubmitBillSummary([request]);
        }),
      )
      .subscribe();
  }

  openModal(category: string) {
    this._categoryToAdd.next(category);
    this._toggleModal.next(true);
  }

  cancelModal() {
    this.modal?.dismiss(null, 'cancel');
    this.updateForm.reset();
    this._toggleModal.next(false);
  }

  confirmModal() {
    this._loadingMessage.next(this.PROCESS_MESSAGE);
    this.handleAddItem();
    this.updateForm.reset();
    this._toggleModal.next(false);
  }

  handleDeleteCategory(category: string) {
    this.toggleActionMenu();
    this._categoryToDelete.next(category);
  }

  handleAction(event: CustomEvent) {
    this.toggleActionMenu();
    const action = (event as unknown as DeleteAction).detail.data.action;
    switch (action) {
      case ButtonActionType.DELETE:
        this._loadingMessage.next(this.PROCESS_MESSAGE);
        this.service.DeleteBillSummaryCategory(this._categoryToDelete.value);
        break;
      default:
        throw new Error(`${action} is not supported yet.`);
    }
  }

  toggleActionMenu() {
    const currentValue = this._toggleActionSheet.value;
    this._toggleActionSheet.next(!currentValue);
  }

  handleSubmit() {
    this._loadingMessage.next(this.PROCESS_MESSAGE);
    this.bills$
      .pipe(
        take(1),
        map((bills) => {
          const request: ISubmitRequest = {
            category: '',
            bills: [],
          };
          bills.forEach((value, key) => {
            const editted = value
              .filter((item) => item.edittedValue !== null)
              .map((item) => ({
                ...item,
                value: item.edittedValue ?? 0,
              }));
            request.bills.push(...editted);
          });
          this.service.UpdateBillItems([request]);
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
