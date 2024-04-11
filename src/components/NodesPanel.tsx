import React from "react";
import { BiMessage } from "react-icons/bi";

const NodesPanel = () => {
  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("application/reactflow", "custom");
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="min-w-96 p-4 border-2 h-full bg-white ">
      <div
        className=" max-w-44 cursor-pointer  p-4 flex flex-col border-blue-200 items-center rounded-md justify-center border bg-white"
        onDragStart={onDragStart}
        draggable
      >
        <BiMessage size={36} className="text-blue-500" />
        <div className="text-blue-500 text-sm font-semibold ">Message</div>
      </div>
    </div>
  );
};

export default NodesPanel;
