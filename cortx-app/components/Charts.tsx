import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', score: 30, pages: 20, fixed: 10 },
  { name: 'Feb', score: 45, pages: 30, fixed: 15 },
  { name: 'Mar', score: 40, pages: 55, fixed: 20 },
  { name: 'Apr', score: 60, pages: 58, fixed: 35 },
  { name: 'May', score: 85, pages: 62, fixed: 40 },
  { name: 'Jun', score: 82, pages: 65, fixed: 45 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-surfaceHighlight p-3 rounded shadow-lg text-xs">
        <p className="text-gray-300 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
           <div key={index} className="flex items-center gap-2 mb-1" style={{color: entry.color}}>
             <span className="w-2 h-2 rounded-full" style={{backgroundColor: entry.color}}></span>
             <span>{entry.name}: {entry.value}</span>
           </div>
        ))}
      </div>
    );
  }
  return null;
};

const MetricsChart: React.FC = () => {
  return (
    <div className="h-[280px] w-full bg-surface rounded-2xl border border-surfaceHighlight p-6 relative">
      <div className="absolute top-6 left-6 z-10">
         <div className="flex flex-col gap-4">
            <div className="bg-blue-500/20 border border-blue-500/50 text-blue-200 text-xs px-3 py-1 rounded-full w-fit">
               Optimization Score
            </div>
         </div>
      </div>
      
      {/* Legend overlays styled like screenshot labels */}
      <div className="absolute top-[30%] right-8 flex flex-col gap-6 z-10 pointer-events-none">
          <div className="bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-blue-500/20 text-center">Optimization Score</div>
          <div className="bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-green-500/20 text-center">Flawless Pages</div>
          <div className="bg-orange-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-orange-400/20 text-center">Issues Fixed</div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 140, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
          />
          <Line 
            type="monotone" 
            dataKey="pages" 
            stroke="#10b981" 
            strokeWidth={3} 
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="fixed" 
            stroke="#fb923c" 
            strokeWidth={3} 
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Custom label for active point example */}
      <div className="absolute top-[50%] left-[30%] bg-surfaceHighlight/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white border border-gray-700">
         24 +3.8%
      </div>
    </div>
  );
};

export default MetricsChart;
