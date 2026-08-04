import React from 'react';

export const MetricCard = ({ title, value, subtitle, icon: Icon, trend, status = 'default' }) => {
  const statusStyles = {
    default: 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700',
    success: 'border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50',
    warning: 'border-amber-500/30 bg-amber-950/10 hover:border-amber-500/50',
  };

  return (
    <div className={`p-5 rounded-2xl border backdrop-blur-sm transition-all duration-200 ${statusStyles[status]}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        {Icon && (
          <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-emerald-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-3xl font-bold font-mono tracking-tight text-white">{value}</span>
        {trend && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-1.5 text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
};