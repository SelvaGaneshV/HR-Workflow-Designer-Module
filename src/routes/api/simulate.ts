import type { WorkflowJson } from "@/types/workflow";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import type { Node } from "@xyflow/react";

export const Route = createFileRoute("/api/simulate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const workflow: WorkflowJson = await request.json();

        const { nodes, edges } = workflow;
        let logs: Record<string, { type: string; message: string }[]> = {};
        let log: { type: string; message: string }[] = [];
        const paths: string[][] = [];

        const findNode = (id: string) => nodes.find((n) => n.id === id);
        const outgoingTargets = (id: string) =>
          edges.filter((e) => e.source === id).map((e) => e.target);

        const start = nodes.find((n) => n.type === "start");
        if (!start) {
          return json(
            {
              status: "error",
              logs: {
                error: [
                  {
                    type: "error",
                    message: "No start node found in workflow.",
                  },
                ],
              },
              paths: [],
            },
            { status: 400 }
          );
        }

        log.push({ type: "info", message: `Starting workflow simulation…` });
        log.push({ type: "info", message: `Start node detected: ${start.id}` });

        /**
         * Recursively traverse the workflow graph starting from a given node.
         * This function is used to simulate the workflow and detect cycles.
         *
         * @param {Object} options - Object containing the following properties:
         * @param {Node} options.node - The current node being processed.
         * @param {Set<string>} options.visited - Set of node IDs that have been visited.
         * @param {string[]} options.path - The current path being traversed.
         * @param {{type: string, message: string}[]} options.log - Array of log messages.
         * @param {string} options.startId - The ID of the start node for this branch.
         */
        const findFlow = ({
          node,
          visited,
          path,
          log,
          startId,
        }: {
          node: Node;
          visited: Set<string>;
          path: string[];
          log: { type: string; message: string }[];
          startId: string;
        }) => {
          if (!node) return;

          log.push({
            type: "info",
            message: `Processing: ${node.type} (${node.id})`,
          });

          if (visited.has(node.id)) {
            log.push({
              type: "error",
              message: `Cycle detected at node ${node.id}. Ending this branch.`,
            });
            logs[startId] = structuredClone(log);
            return;
          }

          const newVisited = new Set(visited);
          newVisited.add(node.id);

          const newPath = [...path, node.id];

          const targets = outgoingTargets(node.id);

          if (node.type === "end") {
            log.push({
              type: "success",
              message: `End reached: path completed.`,
            });
            paths.push(newPath);
            logs[startId] = structuredClone(log);
            return;
          }
          if (targets.length === 0) {
            log.push({
              type: "error",
              message: `Dead-end at ${node.id}. Path terminated.`,
            });
            logs[startId] = structuredClone(log);
            paths.push(newPath);
            return;
          }
          const hasMultipleTargets = targets.length > 1;

          for (let i = 0; i < targets.length; i++) {
            const currentLog = structuredClone(log);
            const target = findNode(targets[i])!;

            findFlow({
              node: target!,
              visited: newVisited,
              path: newPath,
              log: currentLog,
              startId: hasMultipleTargets ? targets[i] : startId,
            });
          }
        };

        findFlow({
          node: start,
          visited: new Set(),
          path: [],
          log,
          startId: start.id,
        });

        return json(
          {
            status: "success",
            logs,
            paths,
          },
          { status: 200 }
        );
      },
    },
  },
});
