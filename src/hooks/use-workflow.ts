import { WorkflowContext } from "@/context/workflow-context";
import type { WorkflowContextType } from "@/types/workflow";
import React from "react";

export const useWorkflow = (): WorkflowContextType => {
  const context = React.useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }
  return context;
};
