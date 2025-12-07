## Installation Instructions (PNPM)

1. Clone the repository:

```
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies using pnpm:

```
pnpm install
```

3. Start the development server:

```
pnpm dev
```

4. Open your browser at `http://localhost:3001` (or the port shown in the terminal).

# Architecture Overview

This project is organized into clear, modular layers designed to keep the workflow designer scalable, maintainable, and easy to extend. Below is an overview of the entire architecture based on the current folder structure.

## 1. Routes Layer (`/routes`)

Handles all UI routing (TanStack Start) and server routes.

### UI Routes

```
routes/
│── __root.tsx     → App shell, layout, providers
└── index.tsx      → Main Workflow Designer screen
```

### Server API Routes

```
routes/api/
│── automations.ts → Mock API for automated action definitions
└── simulate.ts    → Workflow simulation engine (multi-path DFS traversal)
```

These server routes are consumed by the workflow context and node configuration UIs.

## 2. Components Layer (`/components`)

All modular UI elements for the workflow designer.

### Canvas Components (`components/canvas/`)

Responsible for rendering and interacting with the React Flow canvas:

- `workflow-canvas.tsx` — Main React Flow instance
- `workflow-sidebar.tsx` — Sidebar with draggable nodes
- `node-form-panel.tsx` — Dynamic right-panel forms for selected nodes
- `workflow-toolbar.tsx` — Zoom, controls, utilities
- `workflow-controls.tsx` — Extra canvas actions
- `workflow-export-button.tsx` / `workflow-import-button.tsx` — Import/export JSON

### Node Components (`components/nodes/`)

Each node type has its own folder containing:

```
node/
│── node.tsx        → Node visual rendering in canvas
└── node-form.tsx   → Form used when editing the node in the side panel
```

Node types included:

- Start Node
- Task Node
- Approval Node
- Automated Step Node
- End Node

Shared component: `custom-node-toolbar.tsx`.

### Edge Components (`components/edges/`)

Custom edge renderer + toolbar:

```
edges/basic-edge/
│── basic-edge.tsx
└── basic-edge-toolbar.tsx
```

### Sandbox Components (`components/sandbox/`)

UI for testing workflows:

- `workflow-sandbox.tsx` — workflow simulation sidebar
- `workflow-log.tsx` — Timeline-style logs

### Shared Components (`components/shared/`)

Reusable form components:

- `key-value-input.tsx`
- `node-input.tsx`

### UI Components (`components/ui/`)

Shared UI kit components for consistent styling:

- `button.tsx`, `card.tsx`, `tooltip.tsx`, `sheet.tsx`, `sidebar.tsx`, etc.

## 3. Context Layer (`/context`)

Application-wide state using React Context instead of Zustand.

- `workflow-context.tsx` — Manages simulation results, sandbox state, and workflow data.
- `node-form-context.tsx` — Manages form state and validation for selected node.

## 4. Hooks Layer (`/hooks`)

Custom reusable hooks:

- `use-workflow.ts` — `WorkflowContext` context hook
- `use-node-form.ts` — `NodeFormContext` context hook
- `use-simulation.ts` — Managing simulation api calls with TanStack Query
- `use-mobile.ts` — Mobile viewport detection

## 5. Lib Layer (`/lib`)

### Utilities

- `utils.ts` — Global helpers.

### Workflow Utilities (`lib/workflow/`)

- `export.ts` — Serializing React Flow to JSON
- `import.ts` — Converting JSON → React Flow format

## 6. Query Layer (`/query`)

Data fetching abstractions:

- `nodes-query.ts` — Fetch + cache automated action definitions

## 7. Types Layer (`/types`)

TypeScript definitions:

- `workflow.ts` — Workflow graph types
- `nodes.ts` — Node definitions
- `node-form.ts` — Node form schemas

## 8. Constants Layer (`/constant`)

Static metadata:

- `automation.json` — Mock automated action definitions loaded into API

## How It All Works Together

```
React Flow Canvas
   ↕
Node Components + Forms
   ↕
Workflow Context
   ↕
API Routes (/simulate, /automations)
   ↕
Sandbox Panel (Simulation Viewer)
```

## Key Architectural Principles

- Separation of concerns: Canvas, nodes, forms, sandbox, and APIs live in clearly scoped modules.
- Extensible node system: Each node has its own folder + form + renderer.
- Typed workflow engine: Strong TypeScript types enforce workflow validity.
- UI consistency: Shared UI kit ensures consistent styling.
- Scalable workflow simulation: Multi-path traversal supports branching logic.

## Design Choices

* **React Flow**: Provides a robust and flexible canvas for workflow visualization.
* **ShadCN UI components**: Ensures a consistent, modular, and customizable UI design.
* **React Context**: Chosen over Zustand for simplicity and to avoid extra dependencies while maintaining global state.
* **Node modularity**: Each node type has its own folder with form and visual component for easy extension.
* **Multi-path DFS for simulation**: Traverses all workflow paths and handles cycles to support complex branching workflows.
* **Separation of layers**: Clear distinction between UI components, hooks, context, API routes, and utilities to improve maintainability.
* **TypeScript types**: Strong typing ensures type safety across nodes, forms, and workflow data structures.

## Future Improvements

- Add support undo/redo actions.