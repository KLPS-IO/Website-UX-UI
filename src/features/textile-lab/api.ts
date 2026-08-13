import {authenticatedApi} from "@/lib/authenticated-api";
import type {Device,LabOverview,Specimen,TestSession,RawReading} from "./types";
export const textileLabApi={
 overview:async()=>authenticatedApi<{overview:LabOverview}>("/api/textile-lab/overview"),
 devices:async()=>authenticatedApi<{devices:Device[]}>("/api/textile-lab/devices"),
 specimens:async()=>authenticatedApi<{specimens:Specimen[]}>("/api/textile-lab/specimens"),
 sessions:async()=>authenticatedApi<{sessions:TestSession[]}>("/api/textile-lab/sessions"),
 registerDevice:async(body:Record<string,unknown>)=>authenticatedApi<{device:Device}>("/api/textile-lab/devices",{method:"POST",body:JSON.stringify(body)}),
 startSession:async(body:Record<string,unknown>)=>authenticatedApi<{session:TestSession}>("/api/textile-lab/sessions",{method:"POST",body:JSON.stringify(body)}),
 completeSession:async(id:string)=>authenticatedApi<{session:TestSession}>(`/api/textile-lab/sessions/${id}/complete`,{method:"POST"}),
 appendReadings:async(id:string,readings:RawReading[])=>authenticatedApi(`/api/textile-lab/sessions/${id}/readings`,{method:"POST",body:JSON.stringify({readings})}),
};
