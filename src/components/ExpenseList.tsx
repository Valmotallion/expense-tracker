import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpensesStart } from '../store/slices/expensesSlices';
import type { RootState } from '../store/store';

const ExpenseList = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state: RootState) => state.expenses);

  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    dispatch(fetchExpensesStart());
  }, [dispatch]);

  const filteredExpenses = (expenses || []).filter((exp) => {
    const matchCategory = categoryFilter ? exp.category === categoryFilter : true;
    const matchDate = dateFilter ? exp.date.slice(0, 10) === dateFilter : true;
    return matchCategory && matchDate;
  });

  const categoryOptions = ['Transport', 'Food', 'Medicine', 'Others'];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Your Submitted Expenses</h2>

      <div className="flex gap-4 mb-4">
        {/* ✅ Dropdown for Category */}
        <select
          className="border px-2 py-1 rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* ✅ Date Filter */}
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {loading && <p>Loading expenses...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Amount</th>
              <th className="p-3">Category</th>
              <th className="p-3">Description</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((exp) => (
              <tr key={exp._id} className="border-t">
                <td className="p-3">${exp.amount.toFixed(2)}</td> {/* ✅ Currency changed to $ */}
                <td className="p-3">{exp.category}</td>
                <td className="p-3">{exp.description}</td>
                <td className="p-3">{new Date(exp.date).toLocaleDateString()}</td>
                <td className="p-3">{exp.status}</td>
              </tr>
            ))}
            {filteredExpenses.length === 0 && (
              <tr>
                <td colSpan={5} className="p-3 text-center text-gray-500">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
  