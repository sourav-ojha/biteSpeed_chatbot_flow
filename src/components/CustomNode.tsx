import { Handle, NodeProps, Position } from "reactflow";

const CustomNode = ({ id, data, selected }: NodeProps) => {
  return (
    <>
      <div
        className={`w-40 h-auto min-h-10 bg-white flex flex-col border border-black justify-center items-center ${
          selected && "ring-1 border-blue-500 ring-blue-500"
        }`}
      >
        <div className="font-bold bg-blue-200 text-[8px] w-full p-1 ">
          Send Message
        </div>

        <div className="text-[8px] p-2 text-start w-full">{data.label}</div>
        <Handle type="target" position={Position.Left} id={`id-${id}`} />
        <Handle type="source" position={Position.Right} id={id} />
      </div>
    </>
  );
};

export default CustomNode;
