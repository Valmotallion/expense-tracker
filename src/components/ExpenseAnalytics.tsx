import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import type { RootState } from '../store/store';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const ExpenseAnalytics = () => {
  const { expenses } = useSelector((state: RootState) => state.expenses);

  const categoryTotals: Record<string, number> = {};

  expenses.forEach(exp => {
    if (!categoryTotals[exp.category]) categoryTotals[exp.category] = 0;
    categoryTotals[exp.category] += exp.amount;
  });

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ['#4ade80', '#60a5fa', '#f87171', '#facc15', '#a78bfa'],
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4 text-center">Expense Distribution</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpenseAnalytics;
