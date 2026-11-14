'use client';

import React from 'react';

interface SubscriptionSlice {
  planName: string;
  percentage: number;
  count?: number;
  color: string;
}

interface AdminDonutChartProps {
  totalRevenue?: string;
  slices?: SubscriptionSlice[];
}

export function AdminDonutChart({
  totalRevenue = '₹ 18,75,420',
  slices
}: AdminDonutChartProps) {
  const defaultSlices: SubscriptionSlice[] = [
    { planName: 'Starter', percentage: 22.6, color: '#00f59b' },
    { planName: 'Growth', percentage: 34.1, color: '#38bdf8' },
    { planName: 'Business', percentage: 28.4, color: '#a855f7' },
    { planName: 'Enterprise', percentage: 14.9, color: '#f59e0b' }
  ];

  const data = slices && slices.length > 0 ? slices : defaultSlices;

  // Calculate SVG stroke dashes for donut segments
  const size = 150;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <h3 className="text-sm font-bold text-slate-900 mb-3">Revenue & Subscriptions</h3>

      <div className="flex items-center justify-between gap-2">
        {/* SVG Donut */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />
            {data.map((slice, i) => {
              const strokeDasharray = `${(slice.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -cumulativeOffset;
              cumulativeOffset += (slice.percentage / 100) * circumference;

              return (
                <circle
                  key={i}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 hover:opacity-85"
                />
              );
            })}
          </svg>

          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 select-none">
            <span className="text-[11px] font-extrabold text-slate-900 leading-tight">{totalRevenue}</span>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5">Total Revenue</span>
          </div>
        </div>

        {/* Legend on the right */}
        <div className="space-y-2.5 flex-1 pl-3">
          {data.map((slice, i) => (
            <div key={i} className="flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                <span className="text-slate-600 text-xs">{slice.planName}</span>
              </div>
              <span className="font-bold text-slate-900 text-xs">{slice.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

