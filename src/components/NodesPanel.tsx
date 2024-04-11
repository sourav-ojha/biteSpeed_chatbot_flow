import React from "react";
import { BiMessage } from "react-icons/bi";

const NodesPanel = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="min-w-96 p-4 border h-full bg-gray-50 ">
      <div
        className=" max-w-44 cursor-pointer  p-4 flex flex-col border-blue-200 items-center justify-center border bg-white"
        onDragStart={(event) => onDragStart(event, "custom")}
        draggable
      >
        <BiMessage size={40} className="text-blue-500" />
        <div className="text-blue-500 font-semibold ">Message</div>
      </div>
    </div>
  );
};

export default NodesPanel;
