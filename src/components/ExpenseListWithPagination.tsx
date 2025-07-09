// 📁 src/components/ExpenseListWithPagination.tsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpensesStart } from '../store/slices/expensesSlices';
import type { RootState } from '../store/store';

const ExpenseListWithPagination = () => {
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state: RootState) => state.expenses);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchExpensesStart());
  }, [dispatch]);

  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const currentExpenses = expenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Expenses (Paginated)</h2>
      {loading && <p>Loading...</p>}
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Description</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.map((exp) => (
            <tr key={exp._id} className="border-t">
              <td className="p-2">₹{exp.amount}</td>
              <td className="p-2">{exp.category}</td>
              <td className="p-2">{exp.description}</td>
              <td className="p-2">{new Date(exp.date).toLocaleDateString()}</td>
              <td className="p-2">{exp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center space-x-2">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-gray-300 rounded">Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-300 rounded">Next</button>
      </div>
    </div>
  );
};

export default ExpenseListWithPagination;
