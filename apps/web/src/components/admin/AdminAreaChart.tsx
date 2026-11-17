'use client';

import React, { useState } from 'react';

interface DataPoint {
  date: string;
  totalCalls: number;
  callMinutes: number;
}

interface AdminAreaChartProps {
  data?: DataPoint[];
}

export function AdminAreaChart({ data }: AdminAreaChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const defaultData: DataPoint[] = [
    { date: 'Oct 1', totalCalls: 12400, callMinutes: 24200 },
    { date: 'Oct 4', totalCalls: 14600, callMinutes: 27100 },
    { date: 'Oct 7', totalCalls: 18800, callMinutes: 34200 },
    { date: 'Oct 10', totalCalls: 17400, callMinutes: 31900 },
    { date: 'Oct 13', totalCalls: 19100, callMinutes: 36400 },
    { date: 'Oct 16', totalCalls: 18800, callMinutes: 34800 },
    { date: 'Oct 19', totalCalls: 21500, callMinutes: 39400 },
    { date: 'Oct 22', totalCalls: 20200, callMinutes: 37200 },
    { date: 'Oct 25', totalCalls: 25900, callMinutes: 44600 },
    { date: 'Oct 28', totalCalls: 24200, callMinutes: 42400 },
    { date: 'Oct 30', totalCalls: 28400, callMinutes: 48500 }
  ];

  const chartData = data && data.length > 0 ? data : defaultData;
  const maxY = 50000;
  const height = 180;
  const width = 500;
  const paddingX = 20;
  const paddingY = 20;

  const pointsCalls = chartData.map((d, i) => {
    const x = paddingX + (i / (chartData.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - (d.totalCalls / maxY) * (height - 2 * paddingY);
    return { x, y, ...d };
  });

  const pointsMinutes = chartData.map((d, i) => {
    const x = paddingX + (i / (chartData.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - (d.callMinutes / maxY) * (height - 2 * paddingY);
    return { x, y, ...d };
  });

  // Generate smooth SVG path
  const createPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      d += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const pathCalls = createPath(pointsCalls);
  const pathMinutes = createPath(pointsMinutes);
  const areaCalls = `${pathCalls} L ${pointsCalls[pointsCalls.length - 1].x} ${height - paddingY} L ${pointsCalls[0].x} ${height - paddingY} Z`;
  const areaMinutes = `${pathMinutes} L ${pointsMinutes[pointsMinutes.length - 1].x} ${height - paddingY} L ${pointsMinutes[0].x} ${height - paddingY} Z`;

  return (
    <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl flex flex-col justify-between backdrop-blur-xl">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-white tracking-wide">Call & Telephony Usage Trend</h3>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
            <span className="text-slate-400">Total Calls</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f59b] shadow-[0_0_8px_rgba(0,245,155,0.5)]" />
            <span className="text-slate-400">Call Minutes</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Surface */}
      <div className="relative w-full h-56 pt-2">
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-semibold text-slate-500 select-none">
          <span>50K</span>
          <span>40K</span>
          <span>30K</span>
          <span>20K</span>
          <span>10K</span>
          <span>0</span>
        </div>

        {/* SVG Visualization */}
        <div className="ml-7 h-48 relative">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="gradientMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f59b" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#00f59b" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="gradientCalls" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 1, 2, 3, 4].map((gridI) => {
              const y = paddingY + (gridI / 4) * (height - 2 * paddingY);
              return (
                <line
                  key={gridI}
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Area Fills */}
            <path d={areaMinutes} fill="url(#gradientMinutes)" />
            <path d={areaCalls} fill="url(#gradientCalls)" />

            {/* Stroke Lines */}
            <path d={pathMinutes} fill="none" stroke="#00f59b" strokeWidth="2.5" strokeLinecap="round" />
            <path d={pathCalls} fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />

            {/* Data Points Interactive Hover */}
            {pointsMinutes.map((p, i) => (
              <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIdx === i ? 5 : 3}
                  className="fill-[#050a17] stroke-[#00f59b] stroke-2 transition-all"
                />
              </g>
            ))}

            {pointsCalls.map((p, i) => (
              <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIdx === i ? 5 : 3}
                  className="fill-[#050a17] stroke-[#a855f7] stroke-2 transition-all"
                />
              </g>
            ))}
          </svg>

          {/* Hover Tooltip */}
          {hoveredIdx !== null && (
            <div
              className="absolute z-20 bg-[#060b18]/95 border border-slate-700/80 text-white rounded-xl p-2.5 text-[11px] pointer-events-none shadow-2xl -translate-x-1/2 -top-12 transition-all backdrop-blur-md"
              style={{ left: `${(hoveredIdx / (chartData.length - 1)) * 100}%` }}
            >
              <p className="font-bold text-slate-300">{chartData[hoveredIdx].date}</p>
              <p className="text-[#00f59b] font-semibold">Minutes: {chartData[hoveredIdx].callMinutes.toLocaleString('en-IN')}</p>
              <p className="text-[#c084fc] font-semibold">Calls: {chartData[hoveredIdx].totalCalls.toLocaleString('en-IN')}</p>
            </div>
          )}
        </div>

        {/* X-Axis Dates */}
        <div className="ml-7 flex justify-between text-[9px] sm:text-[10px] font-medium text-slate-500 mt-1 select-none overflow-hidden">
          {chartData.map((d, i) => (
            <span
              key={i}
              className={`truncate ${i % 2 !== 0 && i !== chartData.length - 1 ? 'hidden sm:inline' : 'inline'}`}
            >
              {d.date}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

