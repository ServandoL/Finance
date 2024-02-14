import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { AccountSummary } from 'src/app/interfaces';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, RouterModule, CommonModule],
})
export class AccountInfoComponent {
  readonly monthlyBudget = 'Monthly Total';
  @Input() summary: AccountSummary[] = [];

  constructor() {}
}
