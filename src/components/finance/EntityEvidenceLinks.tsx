import { useEffect, useState } from "react";
import { evidenceErrorMessage, evidenceService, isBackendUuid } from "@/services/evidence/evidence.service";
import type { EvidenceEntityType, EvidenceItem } from "@/types/evidence";

export function EntityEvidenceLinks({ entityType, entityId }: { entityType: EvidenceEntityType; entityId: string }) {
  const [items, setItems] = useState<EvidenceItem[]>([]);
  const [error, setError] = useState("");
  const backendRecord = isBackendUuid(entityId);

  useEffect(() => {
    if (!backendRecord) return;
    let active = true;
    evidenceService.linked(entityType, entityId)
      .then((result) => { if (active) setItems(result); })
      .catch((reason) => { if (active) setError(evidenceErrorMessage(reason)); });
    return () => { active = false; };
  }, [backendRecord, entityId, entityType]);

  if (!backendRecord) return <span className="text-xs text-muted-foreground">Backend record required before evidence can be linked.</span>;
  if (error) return <span className="text-xs text-brand-coral">{error}</span>;
  if (!items.length) return <span className="text-xs text-muted-foreground">No linked evidence</span>;
  return <span className="text-xs text-brand-orange">{items.map((item) => `${item.code} — ${item.title}`).join(", ")}</span>;
}

