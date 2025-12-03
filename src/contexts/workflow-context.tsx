import type { WorkflowContextType } from "@/types/workflow";
import React from "react";

const WorkflowContext = React.createContext<WorkflowContextType | null>(null);

export function WorkflowProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const [dragData, setDragData] = React.useState<string | null>(null);
  return (
    <WorkflowContext.Provider value={{ dragData, setDragData }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow(): WorkflowContextType {
  const context = React.useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }
  return context;
}
