import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define the Expense interface
// export interface Expense {
//   _id: string;
//   userId: {
//     _id: string;
//     email: string;
//   };
//   amount: number;
//   category: string;
//   description: string;
//   date: string;
//   status: 'PENDING' | 'APPROVED' | 'REJECTED';
//   __v: number;
// }
interface Expense {
  _id: string;
  userId: { _id: string; email: string };
  amount: number;
  category: string;
  description: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  __v: number;

  // Local-only UI field (not from backend)
  isUpdating?: boolean;
}



// Define the state structure
interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  statusUpdateLoading: boolean; // For tracking status update loading state
  updateStatus: '' | 'pending' | 'success' | 'error';

}

// Initial state
const initialState: ExpensesState = {
  expenses: [],
  loading: false,
  error: null,
  statusUpdateLoading: false,
  updateStatus: ''
};

// Create the slice
const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    // 🔄 Start Fetch
    fetchExpensesStart(state) {
      state.loading = true;
      state.error = null;
    },

    // ✅ On Success
    fetchExpensesSuccess(state, action: PayloadAction<Expense[]>) {
      state.expenses = action.payload;
      state.loading = false;
      state.error = null;
    },

    // ❌ On Failure
    fetchExpensesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },

    // ➕ Add Start (handled by Saga)
    addExpenseStart(state) {
      state.error = null;
    },

    // ✅ On Add Success
    addExpenseSuccess(state, action: PayloadAction<Expense>) {
      state.expenses.unshift(action.payload); // optional: already refetching
    },

    // ❌ On Add Failure
    addExpenseFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // updateExpenseStatusStart: (state, _action: PayloadAction<{ id: string; status: 'APPROVED' | 'REJECTED' }>
    // ) => {
    //   state.statusUpdateLoading = true;
    //   state.updateStatus = 'pending';
    // },

    // updateExpenseStatusSuccess(
    //   state,
    //   action: PayloadAction<{ id: string; status: 'APPROVED' | 'REJECTED' | 'PENDING' }>
    // ) {
    //   const { id, status } = action.payload;
    //   state.expenses = state.expenses.map(exp =>
    //     exp._id === id ? { ...exp, status } : exp
    //   );
    //   state.updateStatus = 'success'; // optional flag to track toast/UI
    // },
    

// updateExpenseStatusFailure(state, action: PayloadAction<string>) {
//   state.updateStatus = 'error';
//   state.error = action.payload;
// }

updateExpenseStatusStart(state, action: PayloadAction<{ id: string; status: 'APPROVED' | 'REJECTED' }>) {
  const expense = state.expenses.find(e => e._id === action.payload.id);
  if (expense) {
    expense.isUpdating = true;
  }
  state.updateStatus = 'pending';
},

updateExpenseStatusSuccess(state, action: PayloadAction<{ id: string; status: 'APPROVED' | 'REJECTED' }>) {
  const { id, status } = action.payload;
  state.expenses = state.expenses.map(exp =>
    exp._id === id ? { ...exp, status, isUpdating: false } : exp
  );
  state.updateStatus = 'success';
},

updateExpenseStatusFailure(state, action: PayloadAction<string>) {
  state.updateStatus = 'error';
  state.statusUpdateLoading = false;
  state.error = action.payload;
}


  },
});

// Export actions
export const {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  addExpenseStart,
  addExpenseSuccess,
  addExpenseFailure,
  updateExpenseStatusStart,
  updateExpenseStatusSuccess,
  updateExpenseStatusFailure
} = expensesSlice.actions;

// Export reducer
export default expensesSlice.reducer;
