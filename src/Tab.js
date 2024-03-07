import React from 'react';

const Tab = ({ index, activeTab, onClick, children }) => {
  return (
    <div
      className={`tab ${index === activeTab ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Tab;