import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseAnalytics from "../components/ExpenseAnalytics";
import LogoutButton from "../components/LogoutButton";

export default function DashboardPage() {
  const navigate = useNavigate();

  // Example: check if user is logged in (this will later come from Redux)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome to the Expense Tracker</p>
      </header>
      <LogoutButton/>
    <ExpenseAnalytics/>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
          <p className="text-2xl font-bold text-blue-600">₹0</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Pending Approvals</h2>
          <p className="text-2xl font-bold text-yellow-500">0</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Approved This Month</h2>
          <p className="text-2xl font-bold text-green-500">₹0</p>
        </div>
      </section>
    </div>
  );
}
