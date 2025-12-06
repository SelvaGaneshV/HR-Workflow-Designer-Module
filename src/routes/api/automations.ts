import { createFileRoute } from "@tanstack/react-router";
import automationJson from "@/constant/automation.json";

export const Route = createFileRoute("/api/automations")({
  server: {
    handlers: {
      GET: () => {
        return new Response(JSON.stringify(automationJson), { status: 200 });
      },
    },
  },
});
