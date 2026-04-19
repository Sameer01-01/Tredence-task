import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { NodeConfigPanel } from './components/NodeConfigPanel';
import { SimulationPanel } from './components/SimulationPanel';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLightMode]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HR Workflow Designer</h1>
        <button 
          className="theme-toggle" 
          onClick={() => setIsLightMode(!isLightMode)}
          aria-label="Toggle theme"
        >
          {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>
      <div className="main-layout">
        <Sidebar />
        <main className="canvas-area">
          <Canvas />
          <SimulationPanel />
        </main>
        <NodeConfigPanel />
      </div>
    </div>
  );
}

export default App;
