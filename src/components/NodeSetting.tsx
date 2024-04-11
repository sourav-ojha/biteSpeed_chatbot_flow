import { useReactFlow } from "reactflow";
import { useStore } from "../store";
import { useEffect, useState } from "react";

const NodeSetting = () => {
  const selectedNode = useStore((state) => state.selectedNode);
  const [input, setInput] = useState("");

  const flow = useReactFlow();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    // update the label of the selected node
    const handleUpdate = () => {
      flow.setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === selectedNode?.id) {
            node.data = {
              ...selectedNode.data,
              label: input,
            };
          }

          return node;
        })
      );
    };
    handleUpdate();
  }, [input]);

  useEffect(() => {
    if (selectedNode) {
      setInput(selectedNode.data.label);
    }
  }, [selectedNode]);

  return (
    <div className="min-w-96  h-full bg-white border-2  py-4  ">
      <div className="text-center  pb-1 px-4 ">Message</div>
      <hr className="my-2  " />
      {selectedNode && (
        <div className="p-4">
          <div className="text-gray-500 pb-2">Text</div>
          <textarea
            value={input}
            onChange={handleInputChange}
            rows={4}
            className="border rounded-md border-gray-300 px-2 py-1 w-full"
          />
        </div>
      )}
    </div>
  );
};

export default NodeSetting;
