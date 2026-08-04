import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Terminal, ShieldAlert, CheckCircle2, Info } from 'lucide-react';

export const Logs = () => {
  const { farmState } = useFarm();

  return (
    <div className="space-y-4 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white">System Audit & Telemetry Log</h2>
        <p className="text-xs text-slate-400">Real-time execution log from Flask Backend & Serial Port Bus</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
        <div className="p-3 bg-slate-900 border-b border-slate-800 text-slate-400 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>stdout / stderr stream</span>
        </div>
        <div className="p-4 space-y-3">
          {farmState.logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/50">
              <span className="text-slate-500 shrink-0">{log.time}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-bold shrink-0">{log.category}</span>
              <span className="text-slate-200">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};