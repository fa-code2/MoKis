import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AIAssistantCard = () => {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border border-emerald-500/30 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-white text-sm">MoKis Neural Diagnostics</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-white">System Operating Optimally</p>
            <p className="text-slate-400 mt-0.5">Crop transpiration rates match biological baseline for Day 18 vegetative phase.</p>
          </div>
        </div>

        <ul className="text-xs space-y-2 text-slate-300 px-1">
          <li className="flex justify-between items-center py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Next Scheduled Irrigation:</span>
            <span className="font-mono text-emerald-400 font-medium">In 20 min (150ml/m²)</span>
          </li>
          <li className="flex justify-between items-center py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Pathology Scan:</span>
            <span className="font-mono text-white font-medium">No active disease flags</span>
          </li>
          <li className="flex justify-between items-center py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Optimization Rec:</span>
            <span className="text-emerald-400 font-medium">Increase LED PPFD by +10%</span>
          </li>
          <li className="flex justify-between items-center py-1">
            <span className="text-slate-400">Projected Yield Value:</span>
            <span className="font-mono font-bold text-white text-sm">₹8,500 EST</span>
          </li>
        </ul>
      </div>

      <button className="mt-4 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950">
        <span>Apply AI Spectrum Recipe</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};