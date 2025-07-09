// 📁 src/components/ExpenseForm.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { addExpenseStart } from '../store/slices/expensesSlices';

const schema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

type FormData = z.infer<typeof schema>;

const ExpenseForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    dispatch(addExpenseStart(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <label>Amount</label>
        <input type="number" step="0.01" {...register('amount', { valueAsNumber: true })} className="border w-full" />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
      </div>
      <div>
        <label>Category</label>
        <input type="text" {...register('category')} className="border w-full" />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('description')} className="border w-full" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <label>Date</label>
        <input type="date" {...register('date')} className="border w-full" />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Expense</button>
    </form>
  );
};

export default ExpenseForm;
