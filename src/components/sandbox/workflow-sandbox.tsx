import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkflow } from "@/context/workflow-context";
import { useSimulation } from "@/hooks/use-simulation";
import { Panel, useReactFlow } from "@xyflow/react";

const WorkflowSandbox: React.FC = () => {
  const { getEdges, getNodes } = useReactFlow();
  const { isSandboxOpen, openSandbox, closeSandbox } = useWorkflow();
  const { runSimulation, simulation } = useSimulation();

  const handleRun = () =>
    runSimulation({ nodes: getNodes(), edges: getEdges() });

  return (
    <>
      <Button variant="outline" size={"sm"} onClick={openSandbox}>
        Open Sandbox
      </Button>

      <Dialog open={isSandboxOpen} onOpenChange={closeSandbox}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Workflow Simulation</DialogTitle>
          </DialogHeader>

          <Button onClick={handleRun} className="w-full mt-2">
            Run Simulation
          </Button>

          <ScrollArea className="h-64 mt-4 rounded-md border p-3">
            {!simulation && (
              <p className="text-sm text-muted-foreground">
                Run the simulation to see execution steps.
              </p>
            )}

            {simulation &&
              simulation.log?.map((line, i) => (
                <div key={i} className="flex gap-2 items-start mb-2 text-sm">
                  <span className="text-xs text-muted-foreground">
                    {i + 1}.
                  </span>
                  <div>{line}</div>
                </div>
              ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkflowSandbox;
