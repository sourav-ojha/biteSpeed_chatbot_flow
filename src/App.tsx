import Header from "./components/Header";
import Builder from "./components/Builder";
import NodesPanel from "./components/NodesPanel";
import { ReactFlowProvider } from "reactflow";

const App = () => {
  return (
    <div>
      <ReactFlowProvider>
        <Header />
        <div className="flex h-[92vh]">
          <div className="flex-1">
            <Builder />
          </div>
          <NodesPanel />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default App;
