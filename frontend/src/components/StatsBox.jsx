import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsBox = ({ title, value, change, icon: Icon, color = 'blue' }) => {
  const colors = {
    blue: {
      icon: 'bg-gradient-to-r from-indigo-400 to-indigo-600',
      text: 'text-indigo-600',
      border: 'border-indigo-100'
    },
    green: {
      icon: 'bg-gradient-to-r from-green-400 to-emerald-500',
      text: 'text-emerald-600',
      border: 'border-emerald-100'
    },
    purple: {
      icon: 'bg-gradient-to-r from-purple-400 to-violet-500',
      text: 'text-violet-600',
      border: 'border-violet-100'
    },
    orange: {
      icon: 'bg-gradient-to-r from-orange-400 to-amber-500',
      text: 'text-amber-600',
      border: 'border-amber-100'
    }
  };

  const currentColor = colors[color] || colors.blue;

  const formatValue = (val) => {
    if (typeof val === 'number') {
      return `₹${val.toLocaleString()}`;
    }
    return val;
  };

  return (
    <div className={`bg-white rounded-2xl border ${currentColor.border} p-6 shadow-md hover:shadow-lg transition-shadow animate-scale-in`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-2">
            {title}
          </p>
          <p className={`text-3xl font-bold mb-2 ${currentColor.text}`}>
            {formatValue(value)}
          </p>
          {change && (
            <div className="flex items-center">
              {change > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
              )}
              <span
                className={`text-sm font-semibold ${
                  change > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${currentColor.icon} shadow-md`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsBox; 