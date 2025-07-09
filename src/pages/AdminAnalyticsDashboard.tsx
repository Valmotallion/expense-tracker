// 📁 src/components/AdminAnalyticsDashboard.tsx

import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const AdminAnalyticsDashboard = () => {
  const { expenses } = useSelector((state: RootState) => state.expenses);

  const statusData = ['APPROVED', 'PENDING', 'REJECTED'].map((status, i) => ({
    name: status,
    value: expenses.filter((e) => e.status === status).length,
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Expense Status Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {statusData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminAnalyticsDashboard;
