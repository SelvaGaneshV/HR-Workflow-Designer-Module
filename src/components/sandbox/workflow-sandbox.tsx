import WorkflowLog from "@/components/sandbox/workflow-log";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useWorkflow } from "@/hooks/use-workflow";
import { cn, getIcon, getIconColor } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { ChevronDownIcon, CircleXIcon, Eraser } from "lucide-react";
import React from "react";

/**
 * WorkflowSandbox Component
 *
 * Provides a complete simulation console for the workflow editor.
 * Allows the user to:
 * - Run workflow simulations based on the current graph (nodes + edges)
 * - View simulation logs in real-time
 * - Navigate to executed nodes via viewport focusing
 * - Select different execution paths (flows) returned from the simulation
 *
 *
 * This component uses:
 * - React Flow (`useReactFlow`) for reading nodes/edges and viewport control
 * - Workflow context (`useWorkflow`) for simulation state and actions
 * - TanStack Query's `queryClient` to clear cached simulation results
 * - shadcn/ui Sidebar for layout
 *
 * @component
 *
 * @returns {JSX.Element} A right-side sidebar containing workflow simulation controls and log viewer UI.
 *
 * @example
 * <WorkflowSandbox />
 */
const WorkflowSandbox: React.FC = () => {
  const queryClient = useQueryClient();
  const { getEdges, getNodes, getNode, fitView } = useReactFlow();
  const {
    isSandboxOpen,
    closeSandbox,
    runSimulation,
    simulation,
    isSimulating,
    selectedFlow,
    setSelectedFlow,
    logs,
  } = useWorkflow();

  const simulationList = simulation
    ? Object.entries(simulation.logs).map(([nodeId, logs]) => {
        const node = getNode(nodeId);
        const lastLog = logs.at(-1);
        const iconType = lastLog?.type ?? "error";

        return {
          id: nodeId,
          title:
            (node?.data?.title as string) ||
            node?.type ||
            lastLog?.nodeTitle ||
            lastLog?.nodeType ||
            lastLog?.title ||
            lastLog?.type,
          iconType,
        };
      })
    : [];

  const handleRun = () => {
    runSimulation({ nodes: getNodes(), edges: getEdges() });
    fitView();
  };

  return (
    <SidebarProvider open={isSandboxOpen} className="w-fit">
      <Sidebar side="right" variant="inset" className="max-w-xl p-1">
        <SidebarHeader className="flex flex-row justify-between items-center">
          <p>Workflow Simulation</p>
          <Button variant={"ghost"} size={"sm"} onClick={closeSandbox}>
            {" "}
            <CircleXIcon />{" "}
          </Button>
        </SidebarHeader>
        <SidebarContent className="w-full h-full">
          <div className="flex gap-1.5 flex-wrap">
            <Button
              size={"sm"}
              variant="outline"
              onClick={handleRun}
              className=" w-full"
            >
              {isSimulating ? "Running..." : "Run Simulation"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={!simulationList.length}
                  size={"sm"}
                  variant="outline"
                  className="flex-1"
                >
                  {
                    (selectedFlow!?.title ||
                      selectedFlow!?.id ||
                      "Select flow") as React.ReactNode
                  }{" "}
                  <ChevronDownIcon className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-md w-(--radix-dropdown-menu-trigger-width)">
                <DropdownMenuRadioGroup
                  value={selectedFlow?.id}
                  onValueChange={(val) => {
                    const selectedFlow = simulationList.find(
                      (s) => s.id === val
                    );
                    setSelectedFlow(selectedFlow || null);
                  }}
                >
                  {simulationList.map((action) => {
                    const Icon = getIcon(action?.iconType);
                    return (
                      <DropdownMenuRadioItem
                        key={action?.id}
                        value={action?.id}
                      >
                        <Icon
                          className={cn(
                            "w-5 h-5",
                            getIconColor(action?.iconType)
                          )}
                        />
                        {action?.title}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size={"sm"}
              variant="outline"
              onClick={() => {
                setSelectedFlow(null);
                queryClient.removeQueries({ queryKey: ["simulate"] });
              }}
            >
              <Eraser />
            </Button>
          </div>

          {!simulation ? (
            <>
              <p className="text-sm text-center text-muted-foreground">
                {isSimulating
                  ? "Simulating..."
                  : "Run the simulation to see execution steps."}
              </p>
            </>
          ) : (
            <div className="flex-1 w-full min-h-0 overflow-hidden">
              <ScrollArea className="h-[99.5%]  flex rounded-md border p-3">
                <div className="flex flex-col gap-3 items-start w-full ">
                  {logs!?.map((log, i) => (
                    <WorkflowLog key={i} log={log} i={i} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default WorkflowSandbox;
