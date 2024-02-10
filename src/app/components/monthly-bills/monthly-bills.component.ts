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
import { BillSummary } from 'src/interfaces/BillSummary';

@Component({
  selector: 'app-monthly-bills',
  templateUrl: './monthly-bills.component.html',
  styleUrls: ['./monthly-bills.component.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class MonthlyBillsComponent {
  importantBills: BillSummary[] = [
    {
      name: 'Rent',
      value: 100,
    },
    {
      name: 'Electric',
      value: 100,
    },
    {
      name: 'Car Insurance',
      value: 100,
    },
    {
      name: 'Grocery',
      value: 100,
    },
    {
      name: 'NTTA',
      value: 100,
    },
    {
      name: 'Internet',
      value: 100,
    },
    {
      name: 'Phones',
      value: 100,
    },
  ];
  creditCards: BillSummary[] = [
    {
      name: 'Amazon CC',
      value: 200,
    },
    {
      name: 'Servando CC',
      value: 200,
    },
    {
      name: 'Servando Apple CC',
      value: 200,
    },
    {
      name: 'Katie CC',
      value: 200,
    },
    {
      name: 'Katie Apple CC',
      value: 200,
    },
    {
      name: 'Target CC',
      value: 200,
    },
  ];
  subscriptions: BillSummary[] = [
    {
      name: 'Hulu',
      value: 100,
    },
    {
      name: 'AppleOne',
      value: 100,
    },
    {
      name: 'Walmart Plus',
      value: 100,
    },
  ];
  constructor() {}
}
