const API_BASE = 'http://127.0.0.1:5000/api';

// Fetch live telemetry (or simulation data) from Flask
export const fetchTelemetry = async () => {
  try {
    const res = await fetch(`${API_BASE}/telemetry`);
    if (!res.ok) throw new Error('Backend response not OK');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn("Flask backend offline, falling back to local state.");
    return null;
  }
};

// Send Water Pump state toggle to Flask
export const togglePumpBackend = async (targetStatus) => {
  try {
    const res = await fetch(`${API_BASE}/control/pump`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: targetStatus }),
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to trigger pump on backend:", err);
  }
};

// Send LED Light state toggle to Flask
export const toggleLEDBackend = async (targetStatus) => {
  try {
    const res = await fetch(`${API_BASE}/control/led`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: targetStatus }),
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to trigger LED on backend:", err);
  }
};