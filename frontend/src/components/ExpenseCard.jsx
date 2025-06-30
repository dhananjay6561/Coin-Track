import { useState } from 'react';
import { Calendar, Tag, TrendingUp, Trash2, Edit, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const ExpenseCard = ({ expense, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-200'
      },
      transport: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-200'
      },
      entertainment: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-200'
      },
      shopping: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-200'
      },
      bills: {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        border: 'border-purple-200'
      },
      health: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-200'
      },
      miscellaneous: {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        border: 'border-gray-200'
      },
    };
    return colors[category.toLowerCase()] || colors.miscellaneous;
  };

  const categoryStyle = getCategoryColor(expense.category);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/expenses/${expense._id}`);
      onDelete(expense._id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete expense:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(expense);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* Table-like row structure */}
        <div className="grid grid-cols-12 gap-4 p-4 items-center">
          {/* Description - 3 columns */}
          <div className="col-span-12 md:col-span-3">
            <p className="font-medium text-gray-900 text-sm mb-1">
              {expense.description || 'No description'}
            </p>
          </div>

          {/* Category - 2 columns */}
          <div className="col-span-6 md:col-span-2">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}>
              {expense.category}
            </span>
          </div>

          {/* Amount - 2 columns */}
          <div className="col-span-6 md:col-span-2">
            <p className="font-semibold text-gray-900">
              ₹{expense.amount.toLocaleString()}
            </p>
          </div>

          {/* Date - 2 columns */}
          <div className="col-span-6 md:col-span-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              {formatDate(expense.date)}
            </div>
          </div>

          {/* Method - 2 columns */}
          <div className="col-span-6 md:col-span-2">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Manual</span>
            </div>
          </div>

          {/* Actions - 1 column */}
          <div className="col-span-12 md:col-span-1">
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={handleEdit}
                className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                title="Edit expense"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Delete expense"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 animate-scale-in shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delete Expense
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this expense? This action cannot be undone.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text}`}>
                    {expense.category}
                  </span>
                  <p className="font-semibold text-gray-900">
                    ₹{expense.amount.toLocaleString()}
                  </p>
                </div>
                {expense.description && (
                  <p className="text-sm text-gray-700 mb-2">
                    {expense.description}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {formatDate(expense.date)}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseCard;