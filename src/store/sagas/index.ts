import { all } from '@redux-saga/core/effects'; 
import { watchExpenseActions } from './expenseSagas';

export default function* rootSaga() {
  yield all([
    watchExpenseActions()
  ]);
}
