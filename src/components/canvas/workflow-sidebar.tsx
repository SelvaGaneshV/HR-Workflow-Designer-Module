import { ModeToggle } from "@/components/mode-toggle";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useWorkflow } from "@/hooks/use-workflow";
import { cn } from "@/lib/utils";
import { useNodes } from "@xyflow/react";
import { Bot, ClipboardCheck, Play, SquareCheckBig, Stamp } from "lucide-react";
import React from "react";

const NODE_TYPES = [
  {
    type: "start",
    label: "Start Node",
    icon: Play,
    description: "Entry point of the workflow",
  },
  {
    type: "task",
    label: "Task Node",
    icon: ClipboardCheck,
    description: "A manual task assigned to someone",
  },
  {
    type: "approval",
    label: "Approval Node",
    icon: Stamp,
    description: "Manager or HR approval step",
  },
  {
    type: "automatedStep",
    label: "Automated Step",
    icon: Bot,
    description: "System-triggered automation (email, docs)",
  },
  {
    type: "end",
    label: "End Node",
    icon: SquareCheckBig,
    description: "Marks the completion of the workflow",
  },
];

/**
 * WorkflowSidebar component.
 *
 * This component renders a sidebar that contains a list of available
 * workflow nodes. Users can drag and drop these nodes onto the canvas to
 * create a workflow.
 *
 * The sidebar contains a header with the title "Workflow Nodes", a list of
 * available nodes, and a footer with a ModeToggle component.
 *s
 * The available nodes are defined in the NODE_TYPES array and include the
 * following:
 * - Start Node
 * - Task Node
 * - Approval Node
 * - Automated Step
 * - End Node
 *
 * Each node is rendered as a Card component with a icon, label, and description.
 * The Card component is draggable and will pass the node type to the
 * onDragStart event handler when dragged.
 *
 * The onDragStart event handler sets the drag data to the node type and allows
 * the drag event to be moved.
 *
 * The WorkflowSidebar component is connected to the useWorkflow hook and gets
 * the setDragData function from it. This function is used to set the drag data
 * when a node is dragged.
 */
const WorkflowSidebar: React.FC = () => {
  const { setDragData } = useWorkflow();
  const nodes = useNodes();
  const hasStartNode = nodes.some((node) => node.type === "start");
  const hasEndNode = nodes.some((node) => node.type === "end");

  const onDragStart = (event: React.DragEvent, type: string) => {
    setDragData(type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="px-4 py-3">
        <h2 className="text-lg font-semibold">Workflow Nodes</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Drag items onto the canvas
        </p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm text-muted-foreground">
            Components
          </SidebarGroupLabel>

          <SidebarGroupContent className="flex flex-col gap-2 mt-2">
            {NODE_TYPES.map((node) => (
              <DraggableNode
                key={node.type}
                hasStartNode={hasStartNode}
                hasEndNode={hasEndNode}
                node={node}
                onDragStart={onDragStart}
              />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
};

const DraggableNode: React.FC<{
  hasEndNode: boolean;
  hasStartNode: boolean;
  node: {
    type: string;
    label: string;
    icon: any;
    description: string;
  };
  onDragStart: (event: React.DragEvent, type: string) => void;
}> = ({ hasStartNode, node, hasEndNode, onDragStart }) => {
  const Icon = node.icon;

  const draggable =
    node.type !== "start"
      ? node.type !== "end"
        ? hasStartNode
        : hasEndNode
        ? false
        : hasStartNode
      : hasStartNode
      ? false
      : true;

  return (
    <Card
      key={node.type}
      draggable={draggable}
      onDragStart={(e) => {
        if (!draggable) return;
        onDragStart(e, node.type);
      }}
      className={cn(
        "select-none transition-colors py-3",
        draggable
          ? "opacity-100 cursor-grab active:cursor-grabbing hover:bg-sidebar-accent"
          : "opacity-50 cursor-default"
      )}
    >
      <CardHeader className="flex items-center gap-3">
        <Icon className="size-5 text-muted-foreground" />
        <div>
          <CardTitle className="text-sm font-medium">{node.label}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {node.description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default WorkflowSidebar;
