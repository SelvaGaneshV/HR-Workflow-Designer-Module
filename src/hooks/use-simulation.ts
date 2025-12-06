import type { SimulationResult, WorkflowJson } from "@/types/workflow";
import React, { useState } from "react";

export function useSimulation() {
  const [simulation, setSimulation] = React.useState<SimulationResult | null>(
    null
  );
  const runSimulation = async (workflowJson: WorkflowJson) => {
    try {
      const res: SimulationResult = await fetch("/api/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workflowJson),
      }).then((res) => res.json());
      setSimulation(res);
    } catch {
      setSimulation({
        status: "error",
        log: ["Simulation failed."],
      });
    }
  };

  return {
    simulation,
    runSimulation,
  };
}
