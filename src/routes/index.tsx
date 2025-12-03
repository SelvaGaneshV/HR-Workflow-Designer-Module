import WorkflowCanvas from "@/components/canvas/workflow-canvas";
import WorkflowSidebar from "@/components/canvas/workflow-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <>
      <WorkflowSidebar />
      <SidebarInset>
        <WorkflowCanvas />
      </SidebarInset>
    </>
  );
}
