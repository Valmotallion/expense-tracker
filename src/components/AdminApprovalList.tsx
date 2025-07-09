import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchExpensesStart, updateExpenseStatusStart } from '../store/slices/expensesSlices';
import type { RootState } from '../store/store';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = MuiAlert as React.ElementType;

const AdminApprovalList = () => {
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state: RootState) => state.expenses);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    dispatch(fetchExpensesStart());
  }, [dispatch]);

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // const handleApproval = (id: string, status: 'APPROVED' | 'REJECTED') => {
  //   dispatch(updateExpenseStatusStart({ id, status }));
  //   setSnackbar({
  //     open: true,
  //     message: `Expense ${status.toLowerCase()} successfully!`,
  //     severity: 'success',
  //   });
  // };
  const handleApproval = (id: string, status: 'APPROVED' | 'REJECTED') => {
    dispatch(updateExpenseStatusStart({ id, status }));
    setSnackbar({
      open: true,
      message: `Expense ${status.toLowerCase()} successfully!`,
      severity: 'success',
    });
  };
  

  const pendingExpenses = expenses.filter((e) => e.status === 'PENDING');

  if (loading) return <p>Loading expenses...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Employee</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Description</th>
            <th className="p-2">Date</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
        {/* {pendingExpenses.filter(Boolean).map((exp) => (
          <tr key={exp._id} className="border-t">
              <td className="p-2">{exp.userId.email}</td>
              <td className="p-2">₹{exp.amount}</td>
              <td className="p-2">{exp.category}</td>
              <td className="p-2">{exp.description}</td>
              <td className="p-2">{new Date(exp.date).toLocaleDateString()}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleApproval(exp._id, 'APPROVED')} className="bg-green-600 px-2 text-white rounded">Approve</button>
                <button onClick={() => handleApproval(exp._id, 'REJECTED')} className="bg-red-600 px-2 text-white rounded">Reject</button>
              </td>
            </tr>
          ))} */}
          {pendingExpenses.map((exp) => (
  <tr key={exp._id} className="border-t">
    <td className="p-2">{exp.userId.email}</td>
    <td className="p-2">₹{exp.amount}</td>
    <td className="p-2">{exp.category}</td>
    <td className="p-2">{exp.description}</td>
    <td className="p-2">{new Date(exp.date).toLocaleDateString()}</td>
    <td className="p-2 space-x-2">
    {exp.isUpdating ? (
  <span className="text-sm text-gray-400">Processing...</span>
) : (
  <>
      <button
        onClick={() => handleApproval(exp._id, 'APPROVED')}
        disabled={exp.isUpdating}
        className={`bg-green-600 px-2 text-white rounded ${exp.isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Approve
      </button>
      <button
        onClick={() => handleApproval(exp._id, 'REJECTED')}
        disabled={exp.isUpdating}
        className={`bg-red-600 px-2 text-white rounded ${exp.isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Reject
      </button>
      </>
)}
    </td>
  </tr>
))}

          {pendingExpenses.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-gray-400 p-4">No pending expenses.</td>
            </tr>
          )}
        </tbody>
      </table>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={handleClose}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminApprovalList;
