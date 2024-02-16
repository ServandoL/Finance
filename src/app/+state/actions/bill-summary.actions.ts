import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BillSummary, ISubmitRequest } from 'src/app/interfaces/BillSummary';
import {
  AddBillItemMongo,
  DeleteBillItemMongo,
  MongoDelete,
  NewCategoryRequest,
  UpdateItemMongo,
} from 'src/app/services/service.interface';

export const BillSummaryActions = createActionGroup({
  source: 'Bill Summary Page',
  events: {
    // defining an event without payload using the `emptyProps` function
    'Get Data': emptyProps(),

    // defining an event with payload using the `props` function
    'Get Data Success': props<{ payload: BillSummary[] }>(),

    // defining an event with payload using the props factory
    'Get Data Failure': props<{ error: string }>(),
    'Reset Data': emptyProps(),
    'Submit Data': props<{ payload: ISubmitRequest[] }>(),
    'Submit Data Success': props<{ payload: AddBillItemMongo }>(),
    'Submit Data Failure': props<{ error: string }>(),
    'Update Data': props<{ payload: ISubmitRequest[] }>(),
    'Update Data Success': props<{ payload: UpdateItemMongo[] }>(),
    'Update Data Failure': props<{ error: string }>(),
    'Delete Item': props<{ payload: BillSummary }>(),
    'Delete Item Success': props<{ payload: DeleteBillItemMongo }>(),
    'Delete Item Failure': props<{ error: string }>(),
    'Delete Category': props<{ payload: string }>(),
    'Delete Category Success': props<{ payload: MongoDelete }>(),
    'Delete Category Failure': props<{ error: string }>(),
    'Add Category': props<{ payload: NewCategoryRequest }>(),
    'Add Category Success': props<{ payload: AddBillItemMongo }>(),
    'Add Category Failure': props<{ error: string }>(),
  },
});
