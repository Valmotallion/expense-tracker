import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpensesStart, updateExpenseStatusStart } from '../store/slices/expensesSlices';
import type { RootState } from '../store/store';
import { toast } from 'react-toastify';
import AdminAnalyticsDashboard from './AdminAnalyticsDashboard';


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state: RootState) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpensesStart());
  }, [dispatch]);
  const { updateStatus } = useSelector((state: RootState) => state.expenses);

useEffect(() => {
  if (updateStatus === 'success') {
    toast.success('Expense status updated successfully');
  }
}, [updateStatus]);

  const handleApproval = (id: string, status: 'APPROVED' | 'REJECTED') => {
    dispatch(updateExpenseStatusStart({ id, status }));
    toast.success(`Expense ${status.toLowerCase()} successfully!`);

  };

  const pendingExpenses = expenses.filter(exp => exp.status === 'PENDING');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Approval Queue</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <AdminAnalyticsDashboard />

      {pendingExpenses.length === 0 ? (
        <p>No pending expenses.</p>
      ) : (
        <table className="w-full border shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">User</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Category</th>
              <th className="p-2">Description</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingExpenses.map(exp => (
              <tr key={exp._id} className="border-t text-center">
                <td className="p-2">{exp.userId.email}</td>
                <td className="p-2">₹{exp.amount}</td>
                <td className="p-2">{exp.category}</td>
                <td className="p-2">{exp.description}</td>
                <td className="p-2">{new Date(exp.date).toLocaleDateString()}</td>
                <td className="p-2">{exp.status}</td>
                <td className="p-2">
                  <button onClick={() => handleApproval(exp._id, 'APPROVED')} className="text-green-600 mr-2">Approve</button>
                  <button onClick={() => handleApproval(exp._id, 'REJECTED')} className="text-red-600">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
