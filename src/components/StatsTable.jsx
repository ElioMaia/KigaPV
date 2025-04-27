import React from 'react';
import OccupancyBar from './OccupancyBar';

const StatsTable = ({ stats }) => (
  <div className="overflow-x-auto bg-white rounded shadow">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-4 py-2">Monat</th>
          <th className="px-4 py-2">Gelb: Belegte Plätze</th>
          <th className="px-4 py-2">Gelb: Kinderanzahl</th>
          <th className="px-4 py-2">Gelb: Freie Plätze</th>
          <th className="px-4 py-2">Grün: Belegte Plätze</th>
          <th className="px-4 py-2">Grün: Kinderanzahl</th>
          <th className="px-4 py-2">Grün: Freie Plätze</th>
          <th className="px-4 py-2">Belegt Gesamt</th>
          <th className="px-4 py-2">Frei Gesamt</th>
          <th className="px-4 py-2">Belegung</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {stats.map((s, i) => (
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-4 py-2">{s.month}</td>
            {/* Gelb */}
            <td className={`px-4 py-2 ${s.freeGelb < 0 ? 'text-red-800' : s.freeGelb > 0 ? 'bg-green-100' : ''}`}>{s.occGelb}</td>
            <td className={`px-4 py-2 ${s.freeGelb < 0 ? 'text-red-800' : s.freeGelb > 0 ? 'bg-green-100' : ''}`}>{s.countGelb}</td>
            <td className={`px-4 py-2 ${s.freeGelb < 0 ? 'text-red-800' : s.freeGelb > 0 ? 'bg-green-100' : ''}`}>{s.freeGelb}</td>
            {/* Grün */}
            <td className={`px-4 py-2 ${s.freeGrün < 0 ? 'text-red-800' : s.freeGrün > 0 ? 'bg-green-100' : ''}`}>{s.occGrün}</td>
            <td className={`px-4 py-2 ${s.freeGrün < 0 ? 'text-red-800' : s.freeGrün > 0 ? 'bg-green-100' : ''}`}>{s.countGrün}</td>
            <td className={`px-4 py-2 ${s.freeGrün < 0 ? 'text-red-800' : s.freeGrün > 0 ? 'bg-green-100' : ''}`}>{s.freeGrün}</td>
            {/* Gesamt */}
            <td className={`px-4 py-2 ${s.freeTotal < 0 ? 'text-red-800' : s.freeTotal > 0 ? 'bg-green-100' : ''}`}>{s.occTotal}</td>
            <td className={`px-4 py-2 ${s.freeTotal < 0 ? 'text-red-800' : s.freeTotal > 0 ? 'bg-green-100' : ''}`}>{s.freeTotal}</td>
            <td className="px-4 py-2 w-40">
              <OccupancyBar occupied={s.occTotal} total={44} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StatsTable;