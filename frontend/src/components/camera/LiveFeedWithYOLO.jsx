import React, { useState } from 'react';
import { Camera, Scan, Maximize2, ShieldAlert } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const LiveFeedWithYOLO = () => {
  const { farmState } = useFarm();
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden relative flex flex-col shadow-2xl">
      {/* Feed Header */}
      <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="font-mono text-xs text-slate-200 font-semibold uppercase tracking-wider">CAM-01 • USB Direct Feed</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">1080p @ 30FPS</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              showBoundingBoxes ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>YOLO v8 Bounding Boxes</span>
          </button>
          <button className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulated Video Canvas Frame */}
      <div className="relative aspect-video bg-slate-900/90 flex items-center justify-center overflow-hidden group">
        {/* Mock Plant Matrix Visual Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        {/* Visual Mock Crops Grid */}
        <div className="grid grid-cols-4 gap-8 p-12 w-full h-full opacity-80">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center relative">
              <div className="w-3/4 h-3/4 rounded-full bg-emerald-500/30 blur-sm"></div>
            </div>
          ))}
        </div>

        {/* Bounding Box Overlays */}
        {showBoundingBoxes && (
          <>
            {/* Box 1: Healthy Plant */}
            <div className="absolute top-[20%] left-[15%] w-[22%] h-[35%] border-2 border-emerald-400 rounded-lg bg-emerald-500/10 p-1 flex flex-col justify-between">
              <span className="text-[10px] font-mono font-bold bg-emerald-500 text-slate-950 px-1 py-0.2 rounded w-max">
                Lettuce #142 (98.2%)
              </span>
              <span className="text-[9px] font-mono text-emerald-300 self-end bg-slate-950/80 px-1 rounded">Stage 3 - Healthy</span>
            </div>

            {/* Box 2: Disease Alert */}
            <div className="absolute top-[45%] right-[25%] w-[20%] h-[32%] border-2 border-amber-400 rounded-lg bg-amber-500/10 p-1 flex flex-col justify-between">
              <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-1 py-0.2 rounded w-max flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Leaf Spot (89.1%)
              </span>
              <span className="text-[9px] font-mono text-amber-300 self-end bg-slate-950/80 px-1 rounded">Action Advised</span>
            </div>
          </>
        )}

        {/* Watermark telemetry */}
        <div className="absolute bottom-3 left-3 font-mono text-[10px] text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
          Inference Time: 14.2ms • CUDA GPU Active
        </div>
      </div>

      {/* Camera Metrics Bar */}
      <div className="p-4 bg-slate-900/60 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/60">
          <p className="text-[10px] uppercase text-slate-400 font-semibold">Total Plants Detected</p>
          <p className="text-lg font-bold font-mono text-white">{farmState.cameraMetrics.totalPlants}</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/60">
          <p className="text-[10px] uppercase text-slate-400 font-semibold">Healthy Biomass</p>
          <p className="text-lg font-bold font-mono text-emerald-400">{farmState.cameraMetrics.healthyPlants}</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/60">
          <p className="text-[10px] uppercase text-slate-400 font-semibold">Anomaly Flags</p>
          <p className="text-lg font-bold font-mono text-amber-400">{farmState.cameraMetrics.diseasedPlants}</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/60">
          <p className="text-[10px] uppercase text-slate-400 font-semibold">Growth Stage</p>
          <p className="text-xs font-bold font-mono text-blue-400 mt-1">{farmState.cameraMetrics.avgGrowthStage}</p>
        </div>
      </div>
    </div>
  );
};