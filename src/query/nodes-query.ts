import type { AutomatadStepActionsResponse } from "@/types/nodes";
import { queryOptions } from "@tanstack/react-query";

const automatedStepActionsQueryOptions = () => {
  return queryOptions({
    queryKey: ["automated-steps-actions"],
    refetchIntervalInBackground: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<AutomatadStepActionsResponse[]> => {
      const response = await fetch("/api/automations");
      return response.json();
    },
  });
};

export { automatedStepActionsQueryOptions };
