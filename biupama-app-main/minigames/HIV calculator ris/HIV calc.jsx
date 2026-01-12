import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';

const exposureTypes = [
  { name: 'Blood transfusion (infected)', risk: 92.5, color: '#dc2626' },
  { name: 'Needle sharing (IDU)', risk: 0.63, color: '#ea580c' },
  { name: 'Receptive anal intercourse', risk: 1.38, color: '#d97706' },
  { name: 'Needlestick injury', risk: 0.23, color: '#ca8a04' },
  { name: 'Insertive anal intercourse', risk: 0.11, color: '#65a30d' },
  { name: 'Receptive vaginal intercourse', risk: 0.08, color: '#16a34a' },
  { name: 'Insertive vaginal intercourse', risk: 0.04, color: '#0d9488' },
  { name: 'Oral sex (receiving)', risk: 0.04, color: '#0891b2' },
  { name: 'Oral sex (performing)', risk: 0.01, color: '#2563eb' },
];

export default function HIVRiskVisualization() {
  const [riskPerContact, setRiskPerContact] = useState(0.1);
  const [maxContacts, setMaxContacts] = useState(100);
  const [selectedPreset, setSelectedPreset] = useState(null);

  const calculateCumulativeRisk = (perContactRisk, contacts) => {
    const p = perContactRisk / 100;
    return (1 - Math.pow(1 - p, contacts)) * 100;
  };

  const chartData = useMemo(() => {
    const data = [];
    const step = maxContacts <= 100 ? 1 : Math.ceil(maxContacts / 100);
    for (let i = 0; i <= maxContacts; i += step) {
      data.push({
        contacts: i,
        cumulativeRisk: calculateCumulativeRisk(riskPerContact, i),
      });
    }
    if (data[data.length - 1]?.contacts !== maxContacts) {
      data.push({
        contacts: maxContacts,
        cumulativeRisk: calculateCumulativeRisk(riskPerContact, maxContacts),
      });
    }
    return data;
  }, [riskPerContact, maxContacts]);

  const contactsFor50Percent = useMemo(() => {
    const p = riskPerContact / 100;
    if (p <= 0) return Infinity;
    return Math.ceil(Math.log(0.5) / Math.log(1 - p));
  }, [riskPerContact]);

  const contactsFor90Percent = useMemo(() => {
    const p = riskPerContact / 100;
    if (p <= 0) return Infinity;
    return Math.ceil(Math.log(0.1) / Math.log(1 - p));
  }, [riskPerContact]);

  const handlePresetClick = (preset) => {
    setRiskPerContact(preset.risk);
    setSelectedPreset(preset.name);
    if (preset.risk > 10) {
      setMaxContacts(20);
    } else if (preset.risk > 1) {
      setMaxContacts(200);
    } else if (preset.risk > 0.1) {
      setMaxContacts(500);
    } else {
      setMaxContacts(1000);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm">
            After <span className="text-white font-bold">{payload[0].payload.contacts}</span> contacts
          </p>
          <p className="text-red-400 font-bold text-lg">
            {payload[0].value.toFixed(2)}% cumulative risk
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            HIV Transmission Risk Visualization
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Even small per-contact risks compound significantly over multiple exposures. 
            This tool demonstrates how cumulative probability grows.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Controls */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Parameters</h2>
            
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Risk per contact: <span className="text-white font-bold">{riskPerContact}%</span>
              </label>
              <input
                type="range"
                min="0.01"
                max="10"
                step="0.01"
                value={riskPerContact}
                onChange={(e) => {
                  setRiskPerContact(parseFloat(e.target.value));
                  setSelectedPreset(null);
                }}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.01%</span>
                <span>10%</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Max contacts: <span className="text-white font-bold">{maxContacts}</span>
              </label>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={maxContacts}
                onChange={(e) => setMaxContacts(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Key Milestones</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">50% risk reached:</span>
                  <span className="text-yellow-400 font-mono">
                    {contactsFor50Percent === Infinity ? '∞' : `${contactsFor50Percent} contacts`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">90% risk reached:</span>
                  <span className="text-red-400 font-mono">
                    {contactsFor90Percent === Infinity ? '∞' : `${contactsFor90Percent} contacts`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">
              Cumulative Risk Over Exposures
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="contacts" 
                    stroke="#9ca3af"
                    label={{ value: 'Number of Contacts', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    label={{ value: 'Cumulative Risk', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={50} stroke="#eab308" strokeDasharray="5 5" label={{ value: '50%', fill: '#eab308', position: 'right' }} />
                  <ReferenceLine y={90} stroke="#ef4444" strokeDasharray="5 5" label={{ value: '90%', fill: '#ef4444', position: 'right' }} />
                  <Area 
                    type="monotone" 
                    dataKey="cumulativeRisk" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    fill="url(#riskGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Formula: Cumulative Risk = 1 - (1 - per-contact risk)^n
            </p>
          </div>
        </div>

        {/* Exposure Type Presets */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">
            Estimated Per-Contact Risk by Exposure Type
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Click to visualize. Estimates based on CDC and published meta-analyses. 
            Actual risk varies with viral load, treatment status, and other factors.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {exposureTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => handlePresetClick(type)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  selectedPreset === type.name 
                    ? 'border-white bg-gray-800' 
                    : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{type.name}</span>
                  <span 
                    className="text-sm font-mono font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: type.color + '20', color: type.color }}
                  >
                    {type.risk}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[10, 50, 100, 500].map((n) => (
            <div key={n} className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
              <p className="text-3xl font-bold text-red-400">
                {calculateCumulativeRisk(riskPerContact, n).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-400">after {n} contacts</p>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-3 text-gray-200">Understanding the Math</h2>
          <div className="text-sm text-gray-400 space-y-2">
            <p>
              The probability of <em>not</em> being infected after n exposures is (1 - p)^n, where p is the per-contact risk.
              Therefore, the cumulative risk of infection is 1 - (1 - p)^n.
            </p>
            <p>
              This demonstrates why even "low" risks matter: at 0.1% per contact, after 693 contacts you'd have 
              a 50% cumulative risk of transmission. After 2,302 contacts, 90%.
            </p>
            <p className="text-yellow-400/80 mt-4">
              ⚠️ These are statistical estimates. Actual transmission depends on viral load (undetectable = untransmittable), 
              PrEP use, condom use, circumcision status, and co-infections. Always consult healthcare providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}