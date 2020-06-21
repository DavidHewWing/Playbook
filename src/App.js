import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Toolbar from './components/toolbar/Toolbar';

function App() {
  return (
    <div className="App">
      <Toolbar />
      <header className="App-header">
        The Ultimate Frisbee Playbook is coming soon.
      </header>
    </div>
  );
}

export default App;
