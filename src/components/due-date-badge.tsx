import { cn, formatDateWithStatus, type DueStatus } from "@/lib/utils";
import { Badge } from "./ui/badge";

const dueBadgeClasses: Record<DueStatus, string> = {
  overdue: "bg-red-500/15 text-red-600 border-red-500/20",
  soon: "bg-yellow-500/15 text-yellow-700 border-yellow-500/20",
  future: "bg-green-500/15 text-green-600 border-green-500/20",
  neutral: "bg-background text-muted-foreground border",
};

export function DueDateBadge({ date }: { date?: string | Date | null }) {
  if (!date) return null;

  const { text, status } = formatDateWithStatus(date);

  return (
    <Badge
      className={cn(
        `whitespace-nowrap px-2 py-0.5 text-center text-[10px] rounded-full border `,
        dueBadgeClasses[status]
      )}
    >
      {text}
    </Badge>
  );
}
