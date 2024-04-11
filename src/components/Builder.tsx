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
  useOnSelectionChange,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { nanoid } from "nanoid";
import { useStore } from "../store";
import { getFromLS } from "../utils";

const initialNodes = getFromLS("nodes") || [];
const initialEdges = getFromLS("edges") || [];

console.log(initialNodes, initialEdges);

const Builder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const setSelectedNode = useStore((state) => state.setSelectedNode);

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

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNode(nodes[0] || null);
    },
  });

  return (
    <div className="w-full h-full bg-white">
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
