import React from 'react';

const OccupancyBar = ({ occupied, total, colorClass = 'bg-blue-500' }) => {
  const percentage = Math.min(100, Math.max(0, (occupied / total) * 100));
  const isOverbooked = occupied > total;

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${isOverbooked ? 'bg-red-500' : colorClass}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default OccupancyBar;