import {useCallback,useEffect,useState,useRef} from 'react';
import {authenticatedApi} from '@/lib/authenticated-api';
import type {CanonicalModel} from '@/types/finance-canonical';
export function useCanonicalFinance(scenario='base'){
 const generation=useRef(0);
 const [model,setModel]=useState<CanonicalModel|null>(null),[error,setError]=useState('');
 const refresh=useCallback(async()=>{const request=++generation.current;setModel(null);try{const r=await authenticatedApi<{model:CanonicalModel}>(`/api/finance/canonical-model?scenario=${encodeURIComponent(scenario)}`);if(request===generation.current){setModel(r.model);setError('');}}catch(e){if(request===generation.current)setError(e instanceof Error?e.message:'Finance unavailable');}},[scenario]);
 useEffect(()=>{void refresh();},[refresh]);return {model,error,refresh};
}
