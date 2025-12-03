import { WorkflowProvider } from "@/contexts/workflow-context";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { ReactFlowProvider } from "@xyflow/react";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {},
  Wrap: ({ children }: React.PropsWithChildren) => (
    <ReactFlowProvider>
      <WorkflowProvider>{children}</WorkflowProvider>
    </ReactFlowProvider>
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");

if (!rootElement) {
  throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
