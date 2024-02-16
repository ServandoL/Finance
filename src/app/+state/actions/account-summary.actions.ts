import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AccountSummary } from 'src/app/interfaces';
import { UpdateItemMongo } from 'src/app/services/service.interface';

export const AccountSummaryActions = createActionGroup({
  source: 'Account Summary Page',
  events: {
    // defining an event without payload using the `emptyProps` function
    'Get Data': emptyProps(),

    // defining an event with payload using the `props` function
    'Get Data Success': props<{ payload: AccountSummary[] }>(),

    // defining an event with payload using the props factory
    'Get Data Failure': props<{ error: string }>(),
    'Update Account Total': props<{ payload: number }>(),
    'Update Account Total Success': props<{ payload: UpdateItemMongo }>(),
    'Update Account Total Failure': props<{ error: string }>(),

    'Reset Data': emptyProps(),
  },
});
