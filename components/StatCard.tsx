import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendDirection, icon: Icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className="p-2 bg-primary-light rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-bold text-dark">{value}</h3>
          <div className="flex items-center mt-1 gap-1">
            {trendDirection === 'up' && <ArrowUpRight className="w-4 h-4 text-emerald-500" />}
            {trendDirection === 'down' && <ArrowDownRight className="w-4 h-4 text-rose-500" />}
            {trendDirection === 'neutral' && <Minus className="w-4 h-4 text-gray-400" />}
            
            <span className={`text-xs font-medium ${
              trendDirection === 'up' ? 'text-emerald-600' : 
              trendDirection === 'down' ? 'text-rose-600' : 'text-gray-500'
            }`}>
              {trend}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;