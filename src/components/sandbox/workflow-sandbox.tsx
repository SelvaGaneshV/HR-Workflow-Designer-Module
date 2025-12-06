import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkflow } from "@/context/workflow-context";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import {
  AlertTriangle,
  CheckCircle,
  ChevronDownIcon,
  CircleXIcon,
  Info,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "../ui/sidebar";

const WorkflowSandbox: React.FC = () => {
  const { getEdges, getNodes, getNode, fitView } = useReactFlow();
  const [selectedSimulation, setSelectedSimulation] = React.useState<string>();
  const {
    isSandboxOpen,
    closeSandbox,
    runSimulation,
    simulation,
    isSimulating,
  } = useWorkflow();
  const iconMap = {
    info: Info,
    success: CheckCircle,
    error: AlertTriangle,
  };
  const simulationList = simulation
    ? Object.entries(simulation.logs).map(([nodeId, logs]) => {
        const node = getNode(nodeId);

        if (!node) {
          return {
            id: nodeId,
            title: nodeId,
            iconType: "error",
          };
        }

        const lastLog = logs.at(-1);
        const iconType = lastLog?.type ?? "error";

        return {
          id: nodeId,
          title: (node.data?.title as string) ?? node.type,
          iconType,
        };
      })
    : [];

  const selectedFlow =
    simulationList.find((s) => s.id === selectedSimulation) ||
    selectedSimulation
      ? null
      : simulationList.at(0);

  const handleRun = () => {
    runSimulation({ nodes: getNodes(), edges: getEdges() });
    fitView();
  };

  return (
    <SidebarProvider
      open={isSandboxOpen}
      className="w-fit"
      style={
        {
          "--sidebar-width": "20rem",
        } as React.CSSProperties
      }
    >
      <Sidebar side="right" variant="inset" className="max-w-xl p-1">
        <SidebarHeader className="flex flex-row justify-between items-center">
          <p>Workflow Simulation</p>
          <Button variant={"ghost"} size={"sm"} onClick={closeSandbox}>
            {" "}
            <CircleXIcon />{" "}
          </Button>
        </SidebarHeader>
        <SidebarContent className="w-full h-full">
          <Button onClick={handleRun} className="w-full h-8 mt-2">
            Run Simulation
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                disabled={!simulationList.length}
                variant="outline"
                className=" text-xs text-center w-full h-8 self-end"
              >
                {
                  (selectedFlow?.title ||
                    selectedSimulation ||
                    "Select Action") as React.ReactNode
                }{" "}
                <ChevronDownIcon className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-md w-(--radix-dropdown-menu-trigger-width)">
              <DropdownMenuRadioGroup
                value={selectedSimulation}
                onValueChange={(val) => {
                  setSelectedSimulation(val);
                }}
              >
                {simulationList.map((action) => {
                  const Icon =
                    iconMap[action?.iconType as keyof typeof iconMap] || Info;
                  return (
                    <DropdownMenuRadioItem key={action?.id} value={action?.id}>
                      <Icon
                        className={cn(
                          "w-5 h-5",
                          action.iconType === "success" && "text-green-600",
                          action.iconType === "info" && "text-primary",
                          action.iconType === "error" && "text-destructive"
                        )}
                      />
                      {action?.title}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex-1 w-full min-h-0 overflow-hidden">
            <ScrollArea className="h-[99.5%]  flex rounded-md border p-3">
              {!simulation && (
                <p className="text-sm text-muted-foreground">
                  Run the simulation to see execution steps.
                </p>
              )}

              {isSimulating && (
                <div className="flex gap-2 items-start mb-2 text-sm">
                  <span className="text-xs text-muted-foreground">...</span>
                  <div>Simulating...</div>
                </div>
              )}
              <div className="flex flex-col gap-2.5 ">
                {simulation?.logs?.[selectedSimulation!] &&
                  simulation?.logs?.[selectedSimulation!].map((line, i) => {
                    const Icon =
                      iconMap[line?.type as keyof typeof iconMap] || Info;
                    return (
                      <div key={i} className="flex gap-2 items-start  text-sm">
                        <span className="text-xs text-muted-foreground">
                          {i + 1}.
                        </span>
                        <Icon
                          className={cn(
                            "size-5",
                            line.type === "success" && "text-green-600",
                            line.type === "info" && "text-blue-500",
                            line.type === "error" && "text-destructive"
                          )}
                        />

                        <div className="wrap-break-word flex-1">
                          {line.message}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </ScrollArea>
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default WorkflowSandbox;
