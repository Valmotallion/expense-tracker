import { call, put } from 'redux-saga/effects';
import { takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';
import type { AxiosResponse } from 'axios'
import {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  addExpenseStart,
  addExpenseSuccess,
  addExpenseFailure,
  updateExpenseStatusStart,
  updateExpenseStatusSuccess,
  updateExpenseStatusFailure
} from '../slices/expensesSlices';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '../slices/expensesSlices'; // 👈 Adjust path if needed

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

// ✅ FETCH Expenses
function* fetchExpensesSaga() {
  try {
    const response: AxiosResponse<Expense[]> = yield call(() =>
      axios.get('/api/expenses', getAuthHeaders())
    );
    yield put(fetchExpensesSuccess(response.data)); // ✅ pass array directly
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch expenses';
    yield put(fetchExpensesFailure(errorMessage));
  }
}

// ✅ ADD Expense
function* addExpenseSaga(action: PayloadAction<Partial<Expense>>) {
  console.log('Saga triggered with:', action.payload);

  try {
    const response: AxiosResponse<Expense> = yield call(() =>
      axios.post('/api/expenses', action.payload, getAuthHeaders())
    );
    console.log('API response:', response.data);

    yield put(addExpenseSuccess(response.data)); // ✅ single object
    // yield put(fetchExpensesStart()); // refresh list
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to add expense';
    yield put(addExpenseFailure(errorMessage));
  }
}
// function* updateExpenseStatusSaga(action: PayloadAction<{ id: string; status: 'APPROVED' | 'REJECTED' }>) {
//   try {
//     const token = localStorage.getItem('token');
//     const response: AxiosResponse<{ expense: Expense }> = yield call(() =>
//       axios.patch(`/api/expenses/${action.payload.id}/approve`, { status: action.payload.status }, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//     );
//     yield put(updateExpenseStatusSuccess({ id: response.data.expense._id, status: response.data.expense.status }));
//   }catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       yield put(updateExpenseStatusFailure(error.response.data?.message || 'Failed to update status'));
//     } else if (error instanceof Error) {
//       yield put(updateExpenseStatusFailure(error.message));
//     } else {
//       yield put(updateExpenseStatusFailure('Failed to update status'));
//     }
//   }
// }

function* updateExpenseStatusSaga(action: PayloadAction<{ id: string; status: 'APPROVED' | 'REJECTED' }>) {
  try {
    const { id, status } = action.payload;
    
    yield call(() => 
      axios.patch(`/api/expenses/${id}/approve`, { status }, getAuthHeaders())
    );

    yield put(updateExpenseStatusSuccess({ id, status }));

  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Error updating expense status';
    yield put(updateExpenseStatusFailure(errorMsg));
  }
}



export function* watchExpenseActions() {
  yield takeLatest(fetchExpensesStart.type, fetchExpensesSaga);
  yield takeLatest(addExpenseStart.type, addExpenseSaga);
  yield takeLatest(updateExpenseStatusStart.type, updateExpenseStatusSaga);
}
