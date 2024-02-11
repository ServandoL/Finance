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
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../components/explore-container/explore-container.component';
import { AccountInfoComponent } from '../../components/account-info/account-info.component';
import { StateService } from 'src/app/services/state.service';
import { Observable } from 'rxjs';
import { AccountSummary } from 'src/app/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state';
import { selectIsLoading, selectSummary } from 'src/app/+state/reducers/account-summary.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
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
  ],
  providers: [StateService],
})
export class Tab1Page implements ViewWillEnter, ViewWillLeave {
  summary$: Observable<AccountSummary[]>;
  isLoading$: Observable<boolean>;
  constructor(
    private service: StateService,
    private store: Store<AppState>,
  ) {
    this.summary$ = this.store.select(selectSummary);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  ionViewWillEnter(): void {
    this.service.GetAccountSummary();
  }

  ionViewWillLeave(): void {
    this.service.ResetAccountSummary();
  }
}
