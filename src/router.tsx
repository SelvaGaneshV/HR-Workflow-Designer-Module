import { WorkflowProvider } from "@/context/workflow-context";
import { routeTree } from "@/routeTree.gen";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ReactFlowProvider } from "@xyflow/react";

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    defaultNotFoundComponent: () => <div>404</div>,
    Wrap: ({ children }: React.PropsWithChildren) => (
      <ReactFlowProvider>
        <WorkflowProvider>{children}</WorkflowProvider>
      </ReactFlowProvider>
    ),
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
