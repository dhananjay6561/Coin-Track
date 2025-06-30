import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import ExpenseCard from '../components/ExpenseCard';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  ChevronDown,
  FileText,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import axios from 'axios';

const Expenses = () => {
  const { user, token } = useAuth(); // Make sure to get token from auth context
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(10);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    filterAndSortExpenses();
  }, [expenses, searchTerm, selectedCategory, sortBy, sortOrder, dateRange]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      
      // Debug logs
      console.log('Auth context values:', { user, token });
      console.log('User exists:', !!user);
      console.log('Token exists:', !!token);
      
      // Check if user is authenticated
      if (!user || !token) {
        console.error('User not authenticated - User:', !!user, 'Token:', !!token);
        setToast({ message: 'Please log in to view expenses', type: 'error' });
        navigate('/login');
        return;
      }

      console.log('Fetching expenses...'); // Debug log
      
      // Configure axios with authentication token
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      console.log('Request config:', config); // Debug log

      // Use full URL or ensure your axios baseURL is configured
      const response = await axios.get('/api/expenses', config);
      
      console.log('Expenses response:', response.data); // Debug log
      
      if (response.data && Array.isArray(response.data)) {
        setExpenses(response.data);
      } else {
        console.error('Invalid response format:', response.data);
        setExpenses([]);
        setToast({ message: 'Invalid data format received', type: 'error' });
      }
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
      
      // Better error handling
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || 'Failed to fetch expenses';
        
        if (status === 401) {
          setToast({ message: 'Session expired. Please log in again.', type: 'error' });
          navigate('/login');
        } else {
          setToast({ message, type: 'error' });
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network error:', error.request);
        setToast({ message: 'Network error. Please check your connection.', type: 'error' });
      } else {
        // Something else happened
        console.error('Error:', error.message);
        setToast({ message: 'An unexpected error occurred', type: 'error' });
      }
      
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      await axios.delete(`/api/expenses/${expenseId}`, config);
      setExpenses(expenses.filter(expense => expense._id !== expenseId));
      setToast({ message: 'Expense deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Failed to delete expense:', error);
      setToast({ message: 'Failed to delete expense', type: 'error' });
    }
  };

  const handleEditExpense = (expense) => {
    navigate(`/edit/${expense._id}`);
  };

  const filterAndSortExpenses = () => {
    let filtered = [...expenses];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(expense =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(expense => expense.category === selectedCategory);
    }

    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(expense => 
        new Date(expense.date) >= new Date(dateRange.start)
      );
    }
    if (dateRange.end) {
      filtered = filtered.filter(expense => 
        new Date(expense.date) <= new Date(dateRange.end)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case 'description':
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
          break;
        default: // date
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredExpenses(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setDateRange({ start: '', end: '' });
    setSortBy('date');
    setSortOrder('desc');
  };

  const getUniqueCategories = () => {
    return [...new Set(expenses.map(expense => expense.category))].sort();
  };

  const calculateStats = () => {
    const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const avgAmount = filteredExpenses.length > 0 ? totalAmount / filteredExpenses.length : 0;
    const categories = getUniqueCategories().length;
    
    return {
      total: totalAmount,
      average: avgAmount,
      count: filteredExpenses.length,
      categories: categories
    };
  };

  // Pagination
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirstExpense, indexOfLastExpense);
  const totalPages = Math.ceil(filteredExpenses.length / expensesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    All Expenses
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">
                    Manage and track your spending history
                  </p>
                </div>
              </div>
            </div>
            <Link
              to="/add"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add Expense
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  ₹{stats.total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  ₹{stats.average.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {stats.count}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {stats.categories}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
              {showFilters ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>

            {/* Sort */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
                <option value="category">Sort by Category</option>
                <option value="description">Sort by Description</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {sortOrder === 'asc' ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">All Categories</option>
                    {getUniqueCategories().map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {filteredExpenses.length === expenses.length ? 'All Expenses' : `Filtered Expenses (${filteredExpenses.length})`}
              </h3>
              {filteredExpenses.length > 0 && (
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstExpense + 1}-{Math.min(indexOfLastExpense, filteredExpenses.length)} of {filteredExpenses.length}
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {currentExpenses.length > 0 ? (
                currentExpenses.map((expense) => (
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
                    <FileText className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {expenses.length === 0 ? 'No expenses yet' : 'No expenses match your filters'}
                  </h4>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {expenses.length === 0 
                      ? 'Start tracking your expenses to see them here'
                      : 'Try adjusting your search criteria or clear the filters'
                    }
                  </p>
                  {expenses.length === 0 ? (
                    <Link
                      to="/add"
                      className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Plus className="w-5 h-5" />
                      Add Your First Expense
                    </Link>
                  ) : (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      <X className="w-5 h-5" />
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {/* Page numbers */}
                <div className="flex gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = index + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + index;
                    } else {
                      pageNumber = currentPage - 2 + index;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === pageNumber
                            ? 'bg-indigo-500 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;