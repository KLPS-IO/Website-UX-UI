import {createContext,useContext,useCallback,useEffect,useState,type ReactNode} from 'react';
import {companyService} from '@/services/company/company';
import type {CompanyHealth,CompanyRecord,CompanyVersion} from '@/types/company';
import type {EvidenceItem} from '@/types/evidence';
import {decisions} from '@/finance/evidence';
type Value={company:CompanyRecord|null;companyHealth:CompanyHealth|null;companyVersions:CompanyVersion[];companyEvidence:EvidenceItem[];companyLoading:boolean;companyError:unknown;refreshCompany:()=>Promise<void>;decisions:typeof decisions};
const FinanceContext=createContext<Value|null>(null);
export function FinanceProvider({children}:{children:ReactNode}){
  const [company, setCompany] = useState<CompanyRecord | null>(null);
  const [companyHealth, setCompanyHealth] = useState<CompanyHealth | null>(null);
  const [companyVersions, setCompanyVersions] = useState<CompanyVersion[]>([]);
  const [companyEvidence, setCompanyEvidence] = useState<EvidenceItem[]>([]);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [companyError, setCompanyError] = useState<unknown>(null);

  const refreshCompany = useCallback(async () => {
    setCompanyLoading(true);
    setCompanyError(null);
    try {
      const record = await companyService.getCompany();
      if (!record) {
        setCompany(null); setCompanyHealth(null); setCompanyVersions([]); setCompanyEvidence([]);
        return;
      }
      const [health, versions, evidence] = await Promise.all([
        companyService.getCompanyHealth(), companyService.getCompanyVersions(), companyService.getCompanyEvidence(record.id),
      ]);
      setCompany(record); setCompanyHealth(health); setCompanyVersions(versions); setCompanyEvidence(evidence);
    } catch (error) {
      setCompany(null); setCompanyHealth(null); setCompanyVersions([]); setCompanyEvidence([]); setCompanyError(error);
    } finally { setCompanyLoading(false); }
  }, []);

  useEffect(() => { void refreshCompany(); }, [refreshCompany]);

  return <FinanceContext.Provider value={{company,companyHealth,companyVersions,companyEvidence,companyLoading,companyError,refreshCompany,decisions}}>{children}</FinanceContext.Provider>;
}
export function useFinance(){const context=useContext(FinanceContext);if(!context)throw new Error('FinanceProvider required');return context;}
