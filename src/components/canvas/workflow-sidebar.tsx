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
import { useWorkflow } from "@/contexts/workflow-context";
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
    type: "automated",
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

function WorkflowSidebar() {
  const { setDragData } = useWorkflow();
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
            {NODE_TYPES.map((node) => {
              const Icon = node.icon;

              return (
                <Card
                  key={node.type}
                  draggable
                  onDragStart={(e) => onDragStart(e, node.type)}
                  className="cursor-grab active:cursor-grabbing hover:bg-sidebar-accent transition-colors py-3"
                >
                  <CardHeader className="flex items-center gap-3">
                    <Icon className="size-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-sm font-medium">
                        {node.label}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        {node.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}

export default WorkflowSidebar;
