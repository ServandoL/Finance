import { FormControl } from '@angular/forms';

export interface BillSummary {
  name: string;
  value: number;
  category: string;
  clicked: boolean;
  edittedValue: number | null;
}

export interface ICategory {
  category: string;
  enable: boolean;
}

export interface ISubmitRequest {
  category: string;
  bills: BillSummary[];
}

export enum BillType {
  IMPORTANT,
  CREDIT_CARD,
  SUBSCRIPTION,
}

export interface UpdateItemForm {
  description: FormControl<string>;
  value: FormControl<number>;
}
