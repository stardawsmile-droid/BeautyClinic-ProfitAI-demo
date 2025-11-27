import React, { useState } from 'react';
import { BrainCircuit, Loader2, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { analyzeProfitability } from '../services/geminiService';
import { ServiceData } from '../types';
import ReactMarkdown from 'react-markdown';

interface AIAdvisorProps {
  data: ServiceData[];
}

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ data }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    const result = await analyzeProfitability(data);
    setAnalysis(result);
    setIsLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-400 to-purple-400 text-white rounded-2xl shadow-lg shadow-indigo-200 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">AI Strategic Advisor</h3>
            <p className="text-xs text-indigo-100">ขับเคลื่อนด้วย Gemini Business Intelligence</p>
          </div>
        </div>
        {!analysis && !isLoading && (
           <button 
             onClick={handleAnalyze}
             className="flex items-center space-x-2 bg-white text-indigo-500 px-4 py-2 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-sm"
           >
             <Sparkles className="w-4 h-4" />
             <span>วิเคราะห์</span>
           </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-white" />
            <p className="text-white animate-pulse">กำลังวิเคราะห์ข้อมูลการเงิน...</p>
          </div>
        ) : analysis ? (
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20 mb-4 backdrop-blur-sm">
                <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
            <button 
              onClick={handleAnalyze} 
              className="w-full mt-4 py-2 text-sm text-indigo-100 hover:text-white border border-white/30 hover:bg-white/10 rounded-xl transition-colors"
            >
              วิเคราะห์ใหม่อีกครั้ง
            </button>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-indigo-100 opacity-90">
            <TrendingUp className="w-16 h-16 mb-4 text-white/30" />
            <p className="max-w-xs font-medium">กดปุ่ม "วิเคราะห์" เพื่อให้ AI ช่วยประเมินว่าควรซื้อ (Buy) หรือขาย (Sell) บริการใด</p>
          </div>
        )}
      </div>
    </div>
  );
};