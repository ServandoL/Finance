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
    on(
      BillSummaryActions.getData,
      BillSummaryActions.submitDataSuccess,
      BillSummaryActions.deleteItemSuccess,
      BillSummaryActions.deleteCategorySuccess,
      BillSummaryActions.updateDataSuccess,
      BillSummaryActions.addCategorySuccess,
      (state) => {
        return {
          ...state,
          isLoading: true,
        };
      },
    ),
    on(BillSummaryActions.getDataSuccess, (state, action) => {
      const map = new Map<string, BillSummary[]>();
      action.payload.forEach((bill) => {
        const key = bill.category;
        const exist = map.get(key);
        if (!exist) {
          map.set(key, [{ ...bill, clicked: false, edittedValue: null }]);
        } else {
          map.set(key, [...exist, { ...bill, clicked: false, edittedValue: null }]);
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
    on(BillSummaryActions.submitData, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
    on(BillSummaryActions.submitDataFailure, (state, action) => {
      return {
        ...state,
        bills: new Map(),
        isLoading: false,
        error: action.error,
      };
    }),
    on(BillSummaryActions.resetData, () => {
      return initialState;
    }),
    on(BillSummaryActions.deleteItem, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
    on(BillSummaryActions.deleteItemFailure, (state, action) => {
      return {
        ...state,
        bills: new Map(),
        isLoading: false,
        error: action.error,
      };
    }),
    on(BillSummaryActions.updateDataFailure, (state, action) => {
      return {
        ...state,
        bills: new Map(),
        isLoading: false,
        error: action.error,
      };
    }),
    on(BillSummaryActions.deleteCategory, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
    on(BillSummaryActions.deleteItemFailure, (state, action) => {
      return {
        ...state,
        bills: new Map(),
        isLoading: false,
        error: action.error,
      };
    }),
    on(BillSummaryActions.addCategory, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
    on(BillSummaryActions.addCategoryFailure, (state, action) => {
      return {
        ...state,
        bills: new Map(),
        isLoading: false,
        error: action.error,
      };
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
