import React, { useState } from 'react';
import { LiveFeedWithYOLO } from '../components/camera/LiveFeedWithYOLO';
import { Camera, Download, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

export const CameraPage = () => {
  const [snapshots, setSnapshots] = useState([
    { id: 1, time: '10:14:02 AM', label: 'Healthy Canopy (Rack A)', status: 'normal' },
    { id: 2, time: '08:30:11 AM', label: 'Leaf Spot Flagged (Rack C)', status: 'warning' },
  ]);

  const handleTakeSnapshot = () => {
    const newSnapshot = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      label: 'Manual Capture (Rack A)',
      status: 'normal',
    };
    setSnapshots([newSnapshot, ...snapshots]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Neural Computer Vision Feed</h2>
          <p className="text-xs text-slate-400">High-definition object detection and pathology classification</p>
        </div>
        <button
          onClick={handleTakeSnapshot}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-emerald-950"
        >
          <Camera className="w-4 h-4" />
          <span>Capture Frame Snapshot</span>
        </button>
      </div>

      {/* Main Full-Width Camera Display */}
      <LiveFeedWithYOLO />

      {/* Snapshot Gallery & Detection History */}
      <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
        <h3 className="text-sm font-semibold text-white">Recent Vision Logs & Stored Snapshots</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {snapshots.map((snap) => (
            <div key={snap.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {snap.status === 'normal' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <div>
                  <p className="text-xs font-semibold text-white">{snap.label}</p>
                  <p className="text-[10px] font-mono text-slate-500">{snap.time}</p>
                </div>
              </div>
              <button className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white">
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};