import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { NodeConfigPanel } from './components/NodeConfigPanel';
import { SimulationPanel } from './components/SimulationPanel';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HR Workflow Designer</h1>
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
