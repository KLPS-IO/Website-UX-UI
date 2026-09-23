import {CanonicalFinancePage} from '@/components/finance/CanonicalFinancePage';
import {DebtApplicationWorkspace} from '@/components/finance/DebtApplicationWorkspace';
import {useDataRoomViewer} from '@/hooks/useDataRoomViewer';
export default function Page(){
 const viewer=useDataRoomViewer();
 return <>{viewer?.isFounderAdmin&&<DebtApplicationWorkspace/>}<CanonicalFinancePage view="Funding"/></>;
}
