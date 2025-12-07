import type { Logs, WorkflowJson } from "@/types/workflow";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import type { Node } from "@xyflow/react";

export const Route = createFileRoute("/api/simulate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const workflow: WorkflowJson = await request.json();

        const { nodes, edges } = workflow;
        let logs: Record<string, Logs[]> = {};
        let log: Logs[] = [];
        const paths: string[][] = [];

        const findNode = (id: string) => nodes.find((n) => n.id === id);
        const outgoingTargets = (id: string) =>
          edges.filter((e) => e.source === id).map((e) => e.target);

        if (!nodes || !edges) {
          return json(
            {
              status: "error",
              logs: {
                error: [
                  {
                    type: "error",
                    nodeId: "",
                    nodeType: "",
                    nodeTitle: "",
                    title: "Invalid",
                    message: "Invalid workflow JSON.",
                  },
                ],
              },
              paths: [],
            },
            { status: 400 }
          );
        }

        if (nodes.length === 0 && edges.length === 0) {
          return json(
            {
              status: "error",
              logs: {
                error: [
                  {
                    type: "error",
                    nodeId: "",
                    nodeType: "",
                    nodeTitle: "",
                    title: "Empty",
                    message: "No nodes or edges found in workflow.",
                  },
                ],
              },
              paths: [],
            },
            { status: 400 }
          );
        }

        if (nodes.length === 0) {
          return json(
            {
              status: "error",
              logs: {
                error: [
                  {
                    type: "error",
                    nodeId: "",
                    nodeType: "",
                    nodeTitle: "",
                    title: "Empty",
                    message: "No nodes found in workflow.",
                  },
                ],
              },
              paths: [],
            },
            { status: 400 }
          );
        }

        if (edges.length === 0) {
          return json(
            {
              status: "error",
              logs: {
                error: [
                  {
                    type: "error",
                    nodeId: "",
                    nodeType: "",
                    nodeTitle: "",
                    title: "Empty",
                    message: "No edges found in workflow.",
                  },
                ],
              },
              paths: [],
            },
            { status: 400 }
          );
        }

        const startNodes = nodes.filter((n) => n.type === "start");
        const endNodes = nodes.filter((n) => n.type === "end");

        if (startNodes.length > 1) {
          return json(
            {
              status: "error",
              logs: {
                error: [
                  {
                    type: "error",
                    nodeId: "",
                    nodeType: "",
                    nodeTitle: "",
                    title: "Invalid",
                    message: "Multiple start nodes found in workflow.",
                  },
                ],
              },
              paths: [],
            },
            { status: 400 }
          );
        }

        if (endNodes.length > 1) {
          return json(
            {
              status: "error",
              logs: {
                error: [
                  {
                    type: "error",
                    nodeId: "",
                    nodeType: "",
                    nodeTitle: "",
                    title: "Invalid",
                    message: "Multiple end nodes found in workflow.",
                  },
                ],
              },
              paths: [],
            },
            { status: 400 }
          );
        }

        const start = nodes.find((n) => n.type === "start");

        if (!start) {
          return json(
            {
              status: "error",
              logs: {
                error: [
                  {
                    type: "error",
                    nodeId: "",
                    nodeType: "",
                    nodeTitle: "",
                    title: "Invalid",
                    message: "No start node found in workflow.",
                  },
                ],
              },
              paths: [],
            },
            { status: 400 }
          );
        }

        log.push({
          type: "start",
          nodeId: start.id,
          nodeType: start.type as string,
          nodeTitle: (start?.data?.title || "") as string,
          time: new Date().toISOString(),
          title: "Workflow Simulation",
          message: `Starting workflow simulation…`,
        });
        log.push({
          type: "info",
          nodeId: start.id,
          nodeType: start.type as string,
          nodeTitle: (start?.data?.title || "") as string,
          time: new Date().toISOString(),
          title: "Simulation Started",
          message: `Start node detected: ${
            start?.data?.title || start.id || ""
          }`,
        });

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
          log: Logs[];
          startId: string;
        }) => {
          if (!node) return;

          log.push({
            type: "info",
            nodeId: node.id,
            nodeType: node.type as string,
            nodeTitle: (node.data?.title || "") as string,
            title: "Processing node",
            time: new Date().toISOString(),
            message: `Processing: ${node.data?.title || node.type}`,
          });

          if (visited.has(node.id)) {
            log.push({
              type: "error",
              nodeId: node.id,
              nodeType: node.type as string,
              nodeTitle: (node?.data?.title || "") as string,
              title: "Cycle detected",
              time: new Date().toISOString(),
              message: `Cycle detected at node ${
                node.data?.title || node.id
              }. Ending this branch.`,
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
              type: "complete",
              nodeId: node.id,
              nodeType: node.type as string,
              nodeTitle: (node?.data?.title || "") as string,
              title: "End reached",
              time: new Date().toISOString(),
              message: `End reached: path completed.`,
            });
            paths.push(newPath);
            logs[startId] = structuredClone(log);
            return;
          }
          if (targets.length === 0) {
            log.push({
              type: "error",
              nodeId: node.id,
              nodeType: node.type as string,
              nodeTitle: (node?.data?.title || "") as string,
              title: "Dead-end",
              time: new Date().toISOString(),
              message: `Dead-end at ${
                node.data?.title || node.id
              }. Path terminated.`,
            });
            logs[startId] = structuredClone(log);
            paths.push(newPath);
            return;
          }

          log.push({
            type: "success",
            nodeId: node.id,
            nodeType: node.type as string,
            nodeTitle: (node?.data?.title || "") as string,
            title: "Node Processed",
            time: new Date().toISOString(),
            message: `Node ${node.data?.title || node.id} processed. ${
              targets.length
            } targets found.`,
          });

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
