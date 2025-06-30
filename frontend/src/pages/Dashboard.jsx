import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import StatsBox from '../components/StatsBox';
import ExpenseCard from '../components/ExpenseCard';
import ExpenseChart from '../components/ExpenseChart';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { DollarSign, TrendingUp, Calendar, Plus, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses(expenses.filter(expense => expense._id !== expenseId));
    setToast({ message: 'Expense deleted successfully!', type: 'success' });
  };

  const handleUpdateExpense = (expenseId, updatedExpense) => {
    setExpenses(expenses.map(expense => 
      expense._id === expenseId ? updatedExpense : expense
    ));
    setToast({ message: 'Expense updated successfully!', type: 'success' });
  };

  const handleEditExpense = (expense) => {
    navigate(`/edit/${expense._id}`);
  };

  const calculateStats = () => {
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const thisWeek = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return expenseDate >= weekAgo;
    });
    const weeklySpent = thisWeek.reduce((sum, expense) => sum + expense.amount, 0);
    
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
    
    const topCategory = Object.entries(categoryTotals).sort(([,a], [,b]) => b - a)[0];
    
    return {
      totalSpent,
      weeklySpent,
      topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null,
      categoryData: Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))
    };
  };

  const stats = calculateStats();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Header */}
        <div className="mb-8 sm:mb-12">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Welcome back, <span className="text-indigo-600">{user?.name || 'User'}</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Here's your financial overview
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <StatsBox
            title="Total Spent"
            value={stats.totalSpent}
            icon={DollarSign}
            color="blue"
          />
          <StatsBox
            title="This Week"
            value={stats.weeklySpent}
            icon={Calendar}
            color="green"
          />
          <StatsBox
            title="Top Category"
            value={stats.topCategory?.amount || 0}
            icon={TrendingUp}
            color="purple"
          />
          <StatsBox
            title="WhatsApp"
            value={user?.whatsappNumber ? "Connected" : "Not Connected"}
            icon={MessageCircle}
            color="orange"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* Expense Chart */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Expense Breakdown
                </h3>
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
              <div className="h-64 sm:h-80">
                <ExpenseChart data={stats.categoryData} />
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
              </div>
              
              <div className="space-y-4">
                <Link
                  to="/add"
                  className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors duration-200 group border border-indigo-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Add Expense</p>
                      <p className="text-sm text-gray-600">Track new spending</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/expenses"
                  className="flex items-center justify-between p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200 group border border-purple-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">View All</p>
                      <p className="text-sm text-gray-600">See full history</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Expenses Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Recent Expenses</h3>
              <Link
                to="/add"
                className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add New</span>
              </Link>
            </div>
            
            <div className="space-y-4">
              {expenses.length > 0 ? (
                expenses.slice(0, 5).map((expense) => (
                  <ExpenseCard 
                    key={expense._id}
                    expense={expense} 
                    onDelete={handleDeleteExpense}
                    onEdit={handleEditExpense}
                  />
                ))
              ) : (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <MessageCircle className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">No expenses yet</h4>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Start tracking your expenses to get insights into your spending habits
                  </p>
                  <Link
                    to="/add"
                    className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Expense
                  </Link>
                </div>
              )}
            </div>
            
            {expenses.length > 5 && (
              <div className="mt-6 text-center border-t border-gray-200 pt-6">
                <Link
                  to="/expenses"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200 group"
                >
                  <span>View all {expenses.length} expenses</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp Integration Info */}
        <div>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 p-6 sm:p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  Smart WhatsApp Integration
                </h3>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  Add expenses instantly by sending WhatsApp messages in natural language:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-xl p-4 border border-white shadow-sm">
                    <code className="text-sm text-indigo-700 font-medium">
                      "Spent ₹500 on groceries"
                    </code>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-white shadow-sm">
                    <code className="text-sm text-indigo-700 font-medium">
                      "Paid ₹1200 for transport"
                    </code>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Your expenses will be automatically categorized and synced to your dashboard!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;