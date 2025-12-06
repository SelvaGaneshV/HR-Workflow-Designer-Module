import type { WorkflowJson } from "@/types/workflow";
import { createFileRoute } from "@tanstack/react-router";
import type { Edge, Node } from "@xyflow/react";

export const Route = createFileRoute("/api/simulate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const workflow: WorkflowJson = await request.json();

        const { nodes, edges } = workflow;
        const log: string[] = [];

        // 1) Find start node
        const start = nodes.find((n: Node) => n.type === "start");
        if (!start) {
          return new Response(
            JSON.stringify({
              status: "error",
              log: ["No Start Node found"],
            }),
            { status: 400 }
          );
        }

        log.push("Starting workflow simulation…");
        log.push(`Start node: ${start.id}`);

        // Utility to find outgoing edges
        const getNextNodes = (nodeId: string) => {
          const outgoing = edges.filter((e: Edge) => e.source === nodeId);
          return outgoing
            .map((e: Edge) => nodes.find((n: Node) => n.id === e.target))
            .filter(Boolean);
        };

        const visited = new Set<string>();
        const executionPath: any[] = [];

        let currentNode = start;

        // 2) Traverse using edges
        while (currentNode) {
          if (visited.has(currentNode.id)) {
            log.push(`Loop detected at node ${currentNode.id}. Stopping.`);
            break;
          }

          visited.add(currentNode.id);
          executionPath.push(currentNode);

          log.push(
            `Processing node: ${currentNode.type} (${currentNode.id})`
          );

          if (currentNode.type === "end") {
            log.push("End node reached. Workflow complete.");
            break;
          }

          const next = getNextNodes(currentNode.id);

          if (next.length === 0) {
            log.push(
              `No outgoing edges from node ${currentNode.id}. Stopping.`
            );
            break;
          }

          if (next.length > 1) {
            log.push(
              `Node ${currentNode.id} has multiple outgoing edges. Taking the first path.`
            );
          }

          currentNode = next[0]!;
        }

        return new Response(
          JSON.stringify({
            status: "success",
            log,
            path: executionPath.map((n) => n.id),
          }),
          { status: 200 }
        );
      },
    },
  },
});
