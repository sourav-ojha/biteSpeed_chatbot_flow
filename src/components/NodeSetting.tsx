import { useReactFlow } from "reactflow";
import { useStore as useCustomStore } from "../store";

const NodeSetting = () => {
  const store = useCustomStore((state) => state);

  const flow = useReactFlow();

  // update the label of the selected node
  const handleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    flow.setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === store.selectedNode?.id) {
          node.data = {
            ...store.selectedNode.data,
            label: value,
          };
        }

        return node;
      })
    );
  };

  return (
    <div className="min-w-96  h-full bg-white border-2  py-4  ">
      <div className="text-center  pb-1 px-4 ">Message</div>
      <hr className="my-2  " />
      {store.selectedNode && (
        <div className="p-4">
          <div className="text-gray-500 pb-2">Text</div>
          <textarea
            defaultValue={store.selectedNode.data.label}
            onChange={handleUpdate}
            rows={4}
            className="border rounded-md border-gray-300 px-2 py-1 w-full"
          />
        </div>
      )}
    </div>
  );
};

export default NodeSetting;
