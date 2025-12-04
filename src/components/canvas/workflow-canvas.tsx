import ApprovalNode from "@/components/nodes/approval-node/approval-node";
import AutomatedStepNode from "@/components/nodes/automated-step-node/automated-step-node";
import EndNode from "@/components/nodes/end-node/end-node";
import StartNode from "@/components/nodes/start-node/start-node";
import TaskNode from "@/components/nodes/task-node/task-node";
import { useWorkflow } from "@/contexts/workflow-context";
import {
  addEdge,
  Background,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import NodeFormPanel from "./node-form-panel";

const NODE_TYPES = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automatedStep: AutomatedStepNode,
  end: EndNode,
};

function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const { dragData, setDragData, setSelectedNode } = useWorkflow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!dragData) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: any = {
        id: crypto.randomUUID(),
        type: dragData,
        position,
        data: { label: `${dragData} node` },
      };

      setNodes((nds) => nds.concat(newNode));
      setDragData(null);
    },
    [screenToFlowPosition, dragData]
  );
  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onEdgesChange={onEdgesChange}
        onPaneClick={() => {
          setSelectedNode(null);
        }}
        nodeTypes={NODE_TYPES}
        onNodeClick={(_, node) => {
          if (node) setSelectedNode(node as Node);
        }}
      >
        <Background color="#aaa" gap={16} />
        <NodeFormPanel />
      </ReactFlow>
    </div>
  );
}

export default WorkflowCanvas;
