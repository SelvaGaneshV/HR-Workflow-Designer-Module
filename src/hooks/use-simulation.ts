import type {
  SimulationResult,
  UseSimulation,
  WorkflowJson,
} from "@/types/workflow";
import { useMutation } from "@tanstack/react-query";

export function useSimulation(): UseSimulation {
  const {
    data: simulation,
    mutate: runSimulation,
    isPending: isSimulating,
  } = useMutation({
    mutationFn: async (workflowJson: WorkflowJson) => {
      const res: SimulationResult = await fetch("/api/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workflowJson),
      }).then((res) => res.json());
      return res;
    },
  });

  return {
    simulation,
    runSimulation,
    isSimulating,
  };
}
