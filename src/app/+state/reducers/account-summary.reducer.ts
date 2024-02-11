import { createFeature, createReducer, on } from '@ngrx/store';
import { RequestState, AccountSummary } from '../../interfaces';
import { AccountSummaryActions } from '../actions/account-summary.actions';

export interface AccountSummaryState extends RequestState {
  summary: AccountSummary[];
}

const initialState: AccountSummaryState = {
  summary: [],
  isLoading: false,
  error: '',
};

export const accountSummaryFeature = createFeature({
  name: 'accountSummary',
  reducer: createReducer(
    initialState,
    on(AccountSummaryActions.getData, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
    on(AccountSummaryActions.getDataSuccess, (state, action) => {
      return {
        ...state,
        isLoading: false,
        summary: action.payload,
      };
    }),
    on(AccountSummaryActions.getDataFailure, (state, action) => {
      return {
        summary: [],
        isLoading: false,
        error: action.error,
      };
    }),
    on(AccountSummaryActions.resetData, () => {
      return initialState;
    }),
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectAccountSummaryState, // feature selector
  selectSummary, // selector for `bills` property
  selectError, // selector for `error` property
  selectIsLoading, // selector for `isLoading` property
} = accountSummaryFeature;
