import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseAnalytics from '../components/ExpenseAnalytics';
import ExpenseList from '../components/ExpenseList';
import ExpenseListWithPagination from '../components/ExpenseListWithPagination';

const EmployeeDashboard = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>
    <AddExpenseForm />
    <ExpenseAnalytics/>
    <ExpenseListWithPagination />

    <ExpenseList />
  </div>
);

export default EmployeeDashboard;
