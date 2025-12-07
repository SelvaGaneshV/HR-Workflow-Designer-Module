import WorkflowCanvas from "@/components/canvas/workflow-canvas";
import WorkflowSidebar from "@/components/canvas/workflow-sidebar";
import WorkflowSandbox from "@/components/sandbox/workflow-sandbox";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import NodeFromProvider from "@/context/node-form-context";
import { automatedStepActionsQueryOptions } from "@/query/nodes-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(automatedStepActionsQueryOptions());
  },
});

function HomeComponent() {
  return (
    <>
      <WorkflowSidebar />
      <SidebarInset>
        <NodeFromProvider>
          <WorkflowCanvas />
        </NodeFromProvider>
      </SidebarInset>
      <WorkflowSandbox />
    </>
  );
}
