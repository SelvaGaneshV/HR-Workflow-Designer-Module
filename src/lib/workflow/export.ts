import type { ReactFlowJsonObject } from "@xyflow/react";

export function downloadWorkflow(data: ReactFlowJsonObject) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `workflow_${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
}
