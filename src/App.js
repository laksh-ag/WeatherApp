import './App.css';
import React, { useState } from 'react';
import Tab from './Tab';
import TabContent from './TabContent';

const cities = ['Rio De Janerio', 'Beijing', 'Los Angeles'];

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        {cities.map((city, index) => (
          <Tab
            key={index}
            index={index}
            activeTab={activeTab}
            onClick={() => setActiveTab(index)}
          >
            {city}
          </Tab>
        ))}
      </div>
      <TabContent city={cities[activeTab]} />
    </div>
  );
}

export default App;
