import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import { ArrowLeft, DollarSign, Tag, FileText, Calendar, Plus, Sparkles } from 'lucide-react';
import axios from 'axios';

const AddExpense = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Miscellaneous',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const categories = [
    'Food',
    'Transport',
    'Entertainment',
    'Shopping',
    'Bills',
    'Health',
    'Miscellaneous',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/expenses', formData);
      
      setToast({ message: 'Expense added successfully!', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setToast({ 
        message: error.response?.data?.message || 'Failed to add expense', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

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
      
      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 sm:mb-12 animate-fadeIn">
            {/* Back Button */}
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 sm:mb-8 group transition-all duration-200 hover:bg-white/70 px-3 py-2 rounded-lg backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium text-sm sm:text-base">Back to Dashboard</span>
            </button>

            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="relative">
                <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2.5 w-2.5 text-yellow-600" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                  Add New Expense
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Track your spending with detailed expense entries
                </p>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-200/20 via-blue-200/20 to-purple-200/20 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 lg:p-10 animate-slideUp">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Amount Input */}
                <div className="group">
                  <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-3">
                    Amount (₹)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <div className="p-1.5 bg-indigo-100 rounded-lg">
                        <DollarSign className="h-4 w-4 text-indigo-600" />
                      </div>
                    </div>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={formData.amount}
                      onChange={handleChange}
                      className="w-full pl-16 pr-4 py-4 text-lg font-medium bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Two Column Layout for Category and Date on larger screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Category Input */}
                  <div className="group">
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-3">
                      Category
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <Tag className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full pl-16 pr-4 py-4 text-base font-medium bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 appearance-none bg-arrow"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date Input */}
                  <div className="group">
                    <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-3">
                      Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <div className="p-1.5 bg-green-100 rounded-lg">
                          <Calendar className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-16 pr-4 py-4 text-base font-medium bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Description Input */}
                <div className="group">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                    Description <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none z-10">
                      <div className="p-1.5 bg-purple-100 rounded-lg">
                        <FileText className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full pl-16 pr-4 py-4 text-base bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 resize-none"
                      placeholder="What was this expense for? Add some notes..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 sm:pt-8">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="order-2 sm:order-1 px-6 py-4 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="order-1 sm:order-2 flex-1 sm:flex-none sm:min-w-[200px] px-6 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-indigo-500/25"
                  >
                    <div className="flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Adding Expense...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          <span>Add Expense</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        
        .bg-arrow {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 1rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
        }
      `}</style>
    </div>
  );
};

export default AddExpense;