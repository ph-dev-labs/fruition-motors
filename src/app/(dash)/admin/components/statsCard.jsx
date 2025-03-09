import React from 'react';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue-600', 
  trend = null,
  trendDirection = null,
  subtitle = null,
  isLoading = false
}) => {
  // Determine trend indicator styling
  const trendStyles = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };
  
  const getTrendStyle = () => {
    if (!trendDirection) return trendStyles.neutral;
    return trendStyles[trendDirection] || trendStyles.neutral;
  };
  
  // Create color classes dynamically but safely with explicit mapping
  const colorMap = {
    'blue-600': 'text-blue-600 bg-blue-50',
    'green-600': 'text-green-600 bg-green-50',
    'red-600': 'text-red-600 bg-red-50',
    'purple-600': 'text-purple-600 bg-purple-50',
    'orange-600': 'text-orange-600 bg-orange-50',
    'teal-600': 'text-teal-600 bg-teal-50',
    'indigo-600': 'text-indigo-600 bg-indigo-50',
    'pink-600': 'text-pink-600 bg-pink-50',
  };
  
  // Default to blue if color isn't in the map
  const iconColorClasses = colorMap[color] || colorMap['blue-600'];
  const [textColor, bgColor] = iconColorClasses.split(' ');

  return (
    <div className="h-full bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <h3 className="text-gray-500 text-sm font-medium tracking-wide uppercase">{title}</h3>
            
            {isLoading ? (
              <div className="animate-pulse h-8 w-24 bg-gray-200 rounded"></div>
            ) : (
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-800">{value}</span>
                
                {trend && trendDirection && (
                  <div className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${getTrendStyle()}`}>
                    {trendDirection === 'up' && <span>↑</span>}
                    {trendDirection === 'down' && <span>↓</span>}
                    {trend}
                  </div>
                )}
              </div>
            )}
            
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          
          <div className={`${bgColor} rounded-lg p-3 flex items-center justify-center`}>
            <Icon size={24} className={textColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;