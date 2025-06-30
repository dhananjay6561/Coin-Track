import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import { User, Mail, Phone, Save, Edit3, Settings, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    whatsappNumber: user?.whatsappNumber || '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

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
      // Mock API call for demo - replace with actual axios call
      // await axios.put('/auth/profile', formData);
      
      setToast({ message: 'Profile updated successfully!', type: 'success' });
      setIsEditing(false);
    } catch (error) {
      setToast({ 
        message: error.response?.data?.message || 'Failed to update profile', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      whatsappNumber: user?.whatsappNumber || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 lg:mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Settings className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Profile Settings
                </h1>
                <p className="text-gray-600 text-sm sm:text-base max-w-md">
                  Manage your account information and preferences with ease.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-indigo-500" />
                    Account Information
                  </h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all duration-300 hover:scale-105 group"
                    >
                      <Edit3 className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-indigo-600">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className={`h-5 w-5 transition-colors duration-200 ${isEditing ? 'text-indigo-500' : 'text-gray-400'}`} />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        disabled={!isEditing}
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                          !isEditing 
                            ? 'bg-gray-50/50 border-gray-200 cursor-not-allowed text-gray-700' 
                            : 'bg-white border-gray-200 focus:border-indigo-400 focus:bg-white hover:border-indigo-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-indigo-600">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 transition-colors duration-200 ${isEditing ? 'text-indigo-500' : 'text-gray-400'}`} />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={!isEditing}
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                          !isEditing 
                            ? 'bg-gray-50/50 border-gray-200 cursor-not-allowed text-gray-700' 
                            : 'bg-white border-gray-200 focus:border-indigo-400 focus:bg-white hover:border-indigo-300'
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number Field */}
                  <div className="group">
                    <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-indigo-600">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className={`h-5 w-5 transition-colors duration-200 ${isEditing ? 'text-indigo-500' : 'text-gray-400'}`} />
                      </div>
                      <input
                        id="whatsappNumber"
                        name="whatsappNumber"
                        type="tel"
                        required
                        disabled={!isEditing}
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                          !isEditing 
                            ? 'bg-gray-50/50 border-gray-200 cursor-not-allowed text-gray-700' 
                            : 'bg-white border-gray-200 focus:border-indigo-400 focus:bg-white hover:border-indigo-300'
                        }`}
                        placeholder="Enter your WhatsApp number"
                      />
                    </div>
                    <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                      <p className="text-xs text-blue-700 flex items-center gap-2">
                        <span className="text-blue-500">💡</span>
                        This number is used to receive expense messages via WhatsApp
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 px-6 py-3 sm:py-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-6 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Account Overview Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-indigo-500" />
                  Account Overview
                </h3>
                
                <div className="space-y-4">
                  {/* Profile Initial */}
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200/50 hover:from-indigo-100 hover:to-blue-100 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Profile Initial</p>
                        <p className="text-sm text-gray-600">Your account avatar</p>
                      </div>
                    </div>
                  </div>

                  {/* Email Status */}
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200/50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        {user?.email ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          <XCircle className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email Status</p>
                        <p className="text-sm text-gray-600">
                          {user?.email ? 'Verified' : 'Not verified'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Status */}
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200/50 hover:from-purple-100 hover:to-violet-100 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        {user?.whatsappNumber ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          <XCircle className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">WhatsApp</p>
                        <p className="text-sm text-gray-600">
                          {user?.whatsappNumber ? 'Connected' : 'Not connected'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">
                      {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    <p className="text-sm text-gray-600">Member since</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;