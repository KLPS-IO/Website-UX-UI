import DataRoom from "@/pages/DataRoom";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/data-room")({
  head: () => ({
    meta: [
      { title: "Investor Data Room - KPLS" },
      {
        name: "description",
        content:
          "Fundraising deck, financial projections, cap table, market research and strategic documents for KPLS investors.",
      },
    ],
  }),
  component: DataRoom,
});
