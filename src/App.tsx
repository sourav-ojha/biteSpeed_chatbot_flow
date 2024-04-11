import Header from "./components/Header";
import Builder from "./components/Builder";
import NodesPanel from "./components/NodesPanel";
import { ReactFlowProvider } from "reactflow";
import { useStore } from "./store";
import NodeSetting from "./components/NodeSetting";

const App = () => {
  const selectedNode = useStore((state) => state.selectedNode);

  return (
    <div>
      <ReactFlowProvider>
        <Header />
        <div className="flex h-[94vh]">
          <div className="flex-1">
            <Builder />
          </div>
          {selectedNode !== null ? <NodeSetting /> : <NodesPanel />}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default App;
