import { Edge, Node, useReactFlow } from "reactflow";
import { setToLS } from "../utils";

const Header = () => {
  const flow = useReactFlow();

  const checkValidFlow = (nodes: Node[], edges: Edge[]) => {
    // check for any node has 0 edges
    const edgeCount: Record<string, number> = {};
    let isValid = true;

    edges.forEach((edge) => {
      if (!edgeCount[edge.source]) {
        edgeCount[edge.source] = 0;
      }
      if (!edgeCount[edge.target]) {
        edgeCount[edge.target] = 0;
      }
      edgeCount[edge.source] += 1;
      edgeCount[edge.target] += 1;
    });

    nodes.forEach((node) => {
      if (edgeCount[node.id] === 0 || !edgeCount[node.id]) {
        isValid = false;
        return;
      }
    });

    return isValid ? true : false;
  };

  const handleSave = () => {
    const nodes = flow.getNodes();
    const edges = flow.getEdges();

    const isValid = checkValidFlow(nodes, edges);

    if (!isValid) {
      alert("Cannot Save. Some Node has no connections");
    } else {
      setToLS("nodes", nodes);
      setToLS("edges", edges);
      alert("Changes Saved");
    }
  };

  return (
    <div className="w-full  bg-[#f3f3f3] ">
      <div className=" mx-4  h-[6vh] flex items-center justify-between">
        <div></div>
        <div className="text-2xl font-semibold tracking-wide ">
          Chatbot flow builder | BiteSpeed
        </div>
        <button
          className="border-blue-500 border text-gray-700 bg-white rounded-md px-4 py-2 w-40 "
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Header;
