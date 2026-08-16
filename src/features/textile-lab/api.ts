import {authenticatedApi} from "@/lib/authenticated-api";
import type {CalibrationFoundation,Device,LabOverview,Specimen,TestSession,RawReading} from "./types";
export const textileLabApi={
 overview:async()=>authenticatedApi<{overview:LabOverview}>("/api/textile-lab/overview"),
 devices:async()=>authenticatedApi<{devices:Device[]}>("/api/textile-lab/devices"),
 specimens:async()=>authenticatedApi<{specimens:Specimen[]}>("/api/textile-lab/specimens"),
 sessions:async()=>authenticatedApi<{sessions:TestSession[]}>("/api/textile-lab/sessions"),
 foundation:async()=>authenticatedApi<CalibrationFoundation&{status:string}>("/api/textile-lab/foundation"),
 createProtocol:async(body:Record<string,unknown>)=>authenticatedApi("/api/textile-lab/protocols",{method:"POST",body:JSON.stringify(body)}),
 createCalibrationRun:async(body:Record<string,unknown>)=>authenticatedApi("/api/textile-lab/calibration-runs",{method:"POST",body:JSON.stringify(body)}),
 addReferenceObservation:async(id:string,body:Record<string,unknown>)=>authenticatedApi(`/api/textile-lab/calibration-runs/${id}/reference-observations`,{method:"POST",body:JSON.stringify(body)}),
 completeCalibrationRun:async(id:string,body:Record<string,unknown>)=>authenticatedApi(`/api/textile-lab/calibration-runs/${id}/complete`,{method:"POST",body:JSON.stringify(body)}),
 createAlgorithmVersion:async(body:Record<string,unknown>)=>authenticatedApi("/api/textile-lab/algorithms",{method:"POST",body:JSON.stringify(body)}),
 calculateDerivedResults:async(id:string,algorithm_version_id:string)=>authenticatedApi(`/api/textile-lab/calibration-runs/${id}/calculate`,{method:"POST",body:JSON.stringify({algorithm_version_id})}),
 reviewDerivedResult:async(id:string,body:Record<string,unknown>)=>authenticatedApi(`/api/textile-lab/derived-results/${id}/reviews`,{method:"POST",body:JSON.stringify(body)}),
 registerDevice:async(body:Record<string,unknown>)=>authenticatedApi<{device:Device}>("/api/textile-lab/devices",{method:"POST",body:JSON.stringify(body)}),
 startSession:async(body:Record<string,unknown>)=>authenticatedApi<{session:TestSession}>("/api/textile-lab/sessions",{method:"POST",body:JSON.stringify(body)}),
 completeSession:async(id:string)=>authenticatedApi<{session:TestSession}>(`/api/textile-lab/sessions/${id}/complete`,{method:"POST"}),
 appendReadings:async(id:string,readings:RawReading[])=>authenticatedApi(`/api/textile-lab/sessions/${id}/readings`,{method:"POST",body:JSON.stringify({readings})}),
};
