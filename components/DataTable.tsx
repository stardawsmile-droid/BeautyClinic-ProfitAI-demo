import React from 'react';
import { ServiceData } from '../types';

interface DataTableProps {
  data: ServiceData[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-indigo-50 overflow-hidden">
      <div className="p-6 border-b border-indigo-50">
        <h3 className="text-lg font-semibold text-slate-700">รายละเอียดรายได้แยกตามบริการ (Services)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-indigo-50/50 text-slate-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">บริการ (Service)</th>
              <th className="px-6 py-4 font-medium">สาขา (Branch)</th>
              <th className="px-6 py-4 font-medium text-right">รายได้ (Revenue)</th>
              <th className="px-6 py-4 font-medium text-right">ต้นทุน (Cost)</th>
              <th className="px-6 py-4 font-medium text-right">กำไรสุทธิ (Profit)</th>
              <th className="px-6 py-4 font-medium text-right">Margin (%)</th>
              <th className="px-6 py-4 font-medium text-center">Growth (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-50 text-sm">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-700">{item.serviceName}</td>
                <td className="px-6 py-4 text-slate-500">
                    <span className="px-2 py-1 rounded-lg bg-slate-100 text-xs font-medium text-slate-600 border border-slate-200">{item.branch}</span>
                </td>
                <td className="px-6 py-4 text-right text-slate-700">{item.revenue.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-slate-400">{item.cost.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-semibold text-violet-500">
                  {item.profit.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    item.margin > 50 
                      ? 'bg-indigo-100 text-indigo-600' 
                      : item.margin > 20 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-pink-100 text-pink-600'
                  }`}>
                    {item.margin.toFixed(1)}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`${item.growth > 0 ? 'text-indigo-400' : 'text-pink-400'} font-medium`}>
                    {item.growth > 0 ? '+' : ''}{item.growth}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};