import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BillSummary } from 'src/app/interfaces/BillSummary';

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
  },
});
