import React from 'react';
import MoodHistory from './MoodHistory';
import MoodGraph from './MoodGraph';

const MoodDashboard = () => {
  return (
    <div>
      <MoodGraph />
      <MoodHistory />
    </div>
  );
};

export default MoodDashboard;
