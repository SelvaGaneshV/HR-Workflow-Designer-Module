import NodeFormPanel from "@/components/canvas/node-form-panel";
import BasicEdge from "@/components/edges/basic-edge/basic-edge";
import ApprovalNode from "@/components/nodes/approval-node/approval-node";
import AutomatedStepNode from "@/components/nodes/automated-step-node/automated-step-node";
import EndNode from "@/components/nodes/end-node/end-node";
import StartNode from "@/components/nodes/start-node/start-node";
import TaskNode from "@/components/nodes/task-node/task-node";
import { useWorkflow } from "@/context/workflow-context";
import {
  addEdge,
  Background,
  ConnectionLineType,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type ColorMode,
  type Connection,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import WorkflowToolbar from "./workflow-toolbar";
import WorkflowControls from "./workflow-controls";
import { useTheme } from "next-themes";

const NODE_TYPES = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automatedStep: AutomatedStepNode,
  end: EndNode,
};

const EDGE_TYPES = {
  default: BasicEdge,
};

/**
 * WorkflowCanvas component
 *
 * This component is responsible for rendering the workflow canvas
 * where the user can create and edit nodes and edges.
 *
 * @returns a React element representing the WorkflowCanvas component
 */

const WorkflowCanvas: React.FC = () => {
  const { theme } = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition, getEdges, getNodes } = useReactFlow();
  const { dragData, setDragData, setSelectedNodeId } = useWorkflow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const isValidConnection = useCallback(
    (connection: Connection) => {
      // we are using getNodes and getEdges helpers here
      // to make sure we create isValidConnection function only once
      const nodes = getNodes();
      const edges = getEdges();
      const target = nodes.find((node) => node.id === connection.target);
      const hasCycle = (node: Node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };
      if (!target) return false;
      if (target.id === connection.source) return false;
      return !hasCycle(target);
    },
    [getNodes, getEdges]
  );

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
        colorMode={theme as ColorMode}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        isValidConnection={isValidConnection}
        onEdgesChange={onEdgesChange}
        onPaneClick={() => {
          setSelectedNodeId(null);
        }}
        connectionLineType={ConnectionLineType.SmoothStep}
        edgeTypes={EDGE_TYPES}
        nodeTypes={NODE_TYPES}
      >
        <Background color="#aaa" gap={16} />
        <NodeFormPanel />
        <WorkflowToolbar />
        <WorkflowControls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
