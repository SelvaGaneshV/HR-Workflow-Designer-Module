import { isEdge, isNode } from "@xyflow/react";

export type ImportedWorkflow = {
  nodes: any[];
  edges: any[];
  version?: string;
};

export function validateWorkflowJson(json: any): {
  valid: boolean;
  error?: string;
} {
  if (!json || typeof json !== "object") {
    return { valid: false, error: "Invalid JSON structure." };
  }

  if (!Array.isArray(json.nodes)) {
    return { valid: false, error: "Missing 'nodes' array." };
  }

  if (!Array.isArray(json.edges)) {
    return { valid: false, error: "Missing 'edges' array." };
  }

  if (json.nodes.some((n: any) => !isNode(n))) {
    return {
      valid: false,
      error: "Invalid node structure.",
    };
  }

  if (json.edges.some((e: any) => !isEdge(e))) {
    return {
      valid: false,
      error:
        "Invalid edge structure.",
    };
  }

  return { valid: true };
}

export async function parseWorkflowFile(file: File): Promise<ImportedWorkflow> {
  const text = await file.text();

  try {
    const json = JSON.parse(text);
    const validation = validateWorkflowJson(json);

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return json;
  } catch (err: any) {
    throw new Error(err.message || "Invalid workflow JSON file.");
  }
}
