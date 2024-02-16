import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  ViewWillEnter,
  ViewWillLeave,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonLoading,
  IonModal,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../components/explore-container/explore-container.component';
import { AccountInfoComponent } from '../../components/account-info/account-info.component';
import { StateService } from 'src/app/services/state.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountSummary, AccountSummaryForm } from 'src/app/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state';
import { selectIsLoading, selectSummary } from 'src/app/+state/reducers/account-summary.reducer';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonItem,
    IonList,
    IonButton,
    IonButtons,
    IonModal,
    IonLoading,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    AccountInfoComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [StateService],
})
export class Tab1Page implements ViewWillEnter, ViewWillLeave {
  readonly monthlyBudget = 'Monthly Total';
  summary$: Observable<AccountSummary[]>;
  isLoading$: Observable<boolean>;
  _toggleModal = new BehaviorSubject<boolean>(false);
  updateForm: FormGroup<AccountSummaryForm>;
  constructor(
    private service: StateService,
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {
    this.summary$ = this.store.select(selectSummary);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.updateForm = this.fb.nonNullable.group({
      total: [0],
    });
  }

  handleClick(type: string) {
    if (type === 'Account Total') {
      this._toggleModal.next(true);
    }
  }

  get toggleModal$(): Observable<boolean> {
    return this._toggleModal.asObservable();
  }

  get form(): AccountSummaryForm {
    return this.updateForm.controls;
  }

  cancelModal() {
    this._toggleModal.next(false);
  }

  confirmModal() {
    this.service.UpdateAccountSummaryTotal(this.form.total.value);
    this._toggleModal.next(false);
  }

  ionViewWillEnter(): void {
    this.service.GetAccountSummary();
  }

  ionViewWillLeave(): void {
    this.service.ResetAccountSummary();
  }
}
