import { FormControl } from '@angular/forms';
import { BSON } from 'realm-web';

export interface AccountSummary {
  _id: BSON.ObjectID;
  total: number;
  type: string;
  updatedTms: Date;
}

export interface AccountSummaryForm {
  total: FormControl<number>;
}

export interface UpdateAccountSummaryRequest {
  _id: string;
  value: number;
}
