import React from 'react';

const DashboardHome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
      <div className="p-12 rounded-2xl border-2 border-dashed border-gray-200 bg-white">
        <h2 className="text-2xl font-semibold text-gray-400">Main Content</h2>
        <p className="text-gray-500 mt-2">Select a feature from the sidebar to get started with <span className="text-primary font-medium">Pflegas</span>.</p>
      </div>
    </div>
  );
};

export default DashboardHome;