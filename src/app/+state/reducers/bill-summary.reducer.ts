import { createFeature, createReducer, on } from '@ngrx/store';
import { RequestState, BillSummary } from '../../interfaces';
import { BillSummaryActions } from '../actions/bill-summary.actions';

export interface BillSummaryState extends RequestState {
  bills: Map<string, BillSummary[]>;
}

const initialState: BillSummaryState = {
  bills: new Map(),
  isLoading: false,
  error: '',
};

export const billSummaryFeature = createFeature({
  name: 'billSummary',
  reducer: createReducer(
    initialState,
    on(BillSummaryActions.getData, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
    on(BillSummaryActions.getDataSuccess, (state, action) => {
      const map = new Map<string, BillSummary[]>();
      action.payload.forEach((bill) => {
        const key = bill.category;
        const exist = map.get(key);
        if (!exist) {
          map.set(key, [bill]);
        } else {
          map.set(key, [...exist, bill]);
        }
      });
      return {
        ...state,
        isLoading: false,
        bills: map,
      };
    }),
    on(BillSummaryActions.getDataFailure, (state, action) => {
      return {
        bills: new Map(),
        isLoading: false,
        error: action.error,
      };
    }),
    on(BillSummaryActions.resetData, () => {
      return initialState;
    }),
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectBillSummaryState, // feature selector
  selectBills, // selector for `bills` property
  selectError, // selector for `error` property
  selectIsLoading, // selector for `isLoading` property
} = billSummaryFeature;
