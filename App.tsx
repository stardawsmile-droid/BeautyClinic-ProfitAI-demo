import React, { useState } from 'react';
import { MOCK_DATA } from './constants';
import { StatCard } from './components/StatCard';
import { DataTable } from './components/DataTable';
import { AIAdvisor } from './components/AIAdvisor';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Stethoscope } from 'lucide-react';

const App: React.FC = () => {
  // In a real app, this state would come from an API/Database
  const [data] = useState(MOCK_DATA);

  // Calculate Aggregates
  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);
  const avgMargin = totalProfit / totalRevenue * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-indigo-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-400 to-violet-400 p-2 rounded-xl shadow-md">
                <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              BeautyClinic <span className="text-indigo-500">ProfitAI</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
             <span className="text-sm text-slate-500 hidden sm:block">เจ้าหน้าที่ควบคุมดูแลกิจการ</span>
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-200">
                A
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="รายได้รวม (Total Revenue)" 
            value={`฿${(totalRevenue / 1000000).toFixed(2)}M`} 
            trend={12.5} 
            icon="dollar"
            color="indigo"
          />
          <StatCard 
            title="กำไรสุทธิ (Net Profit)" 
            value={`฿${(totalProfit / 1000000).toFixed(2)}M`} 
            trend={8.2} 
            icon="dollar"
            color="violet"
          />
          <StatCard 
            title="อัตรากำไรเฉลี่ย (Avg Margin)" 
            value={`${avgMargin.toFixed(1)}%`} 
            trend={-2.1} 
            icon="activity"
            color="fuchsia"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-indigo-50">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-semibold text-slate-700">ประสิทธิภาพรายบริการ (Revenue vs Cost)</h3>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="serviceName" tick={{fontSize: 12, fill: '#64748b'}} interval={0} angle={-15} textAnchor="end" height={60} />
                  <YAxis tickFormatter={(value) => `${value / 1000}k`} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    formatter={(value: number) => [`฿${value.toLocaleString()}`, '']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="รายได้" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={40} />
                  <Bar dataKey="cost" name="ต้นทุน" fill="#f472b6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Advisor Section */}
          <div className="lg:col-span-1 h-full min-h-[400px]">
             <AIAdvisor data={data} />
          </div>
        </div>

        {/* Data Table Section */}
        <div className="mb-8">
          <DataTable data={data} />
        </div>
      </main>
    </div>
  );
};

export default App;