import { all } from 'redux-saga/effects';
import { watchExpenseActions } from './expenseSagas';

export default function* rootSaga() {
  yield all([
    watchExpenseActions()
  ]);
}
