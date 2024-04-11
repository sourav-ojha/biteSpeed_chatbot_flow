import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  MarkerType,
  Panel,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { nanoid } from "nanoid";

const initialNodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    type: "custom",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "World 1" },
    position: { x: 100, y: 200 },
  },
];

const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

const Builder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const CustomNode_ = useMemo(() => CustomNode, []);

  const nodeTypes = {
    custom: CustomNode_,
  };

  const onConnect = useCallback((params: Connection) => {
    // one source can have one target
    const sourceExists = edges.findIndex(
      (edge) => edge.source === params.source
    );
    if (sourceExists > -1) return alert("Cannot connect two nodes");
    return setEdges((eds) =>
      addEdge(
        {
          id: nanoid(),
          ...params,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        eds
      )
    );
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined") {
        return;
      }

      if (reactFlowInstance === null) return;

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="w-full h-full bg-blue-50">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="bottom-left">bottom-right</Panel>
      </ReactFlow>
    </div>
  );
};

export default Builder;
