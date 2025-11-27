import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Activity } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: number;
  icon?: 'dollar' | 'activity';
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon = 'dollar', color = 'indigo' }) => {
  const isPositive = trend && trend >= 0;
  
  // Tailwind color mapping needs to be explicit for dynamic classes in some setups,
  // but standard palette usually works. We use softer shades here.
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-50 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-${color}-100`}>
          {icon === 'dollar' ? (
            <DollarSign className={`w-6 h-6 text-${color}-500`} />
          ) : (
            <Activity className={`w-6 h-6 text-${color}-500`} />
          )}
        </div>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center mt-4 text-sm ${isPositive ? 'text-indigo-500' : 'text-pink-500'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          <span className="font-semibold">{Math.abs(trend)}%</span>
          <span className="text-slate-400 ml-2">จากเดือนที่แล้ว</span>
        </div>
      )}
    </div>
  );
};