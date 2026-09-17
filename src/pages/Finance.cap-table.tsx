import { PageHeader } from '@/components/finance/PageHeader';
import { FounderCatalystWorkspace } from '@/components/data-room/FounderCatalystWorkspace';
import { useDataRoomViewer } from '@/hooks/useDataRoomViewer';

export default function CapTablePage() {
  const viewer = useDataRoomViewer();
  return <div><PageHeader eyebrow="Company ownership" title="Capitalisation table" description="Evidence-backed ownership, historical records and separate fundraising scenarios."/>
    {viewer?.isFounderAdmin ? <FounderCatalystWorkspace ownershipOnly/> : <p className="p-5">Founder/admin access is required to view working ownership records.</p>}
  </div>;
}
