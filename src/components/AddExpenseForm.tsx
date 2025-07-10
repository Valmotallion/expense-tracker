import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { addExpenseStart } from '../store/slices/expensesSlices';

const AddExpenseForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const expense = {
      amount: Number(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    };

    dispatch(addExpenseStart(expense));

    // Reset form
    setFormData({ amount: '', category: '', description: '', date: '' });
  };

  const categoryOptions = ['Transport', 'Food', 'Medicine', 'Others'];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto p-6 bg-white rounded shadow"
    >
      <input
        type="number"
        name="amount"
        placeholder="Amount in $"
        value={formData.amount}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
        required
      />

      {/* ✅ Dropdown for category */}
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
        required
      >
        <option value="">Select Category</option>
        {categoryOptions.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
