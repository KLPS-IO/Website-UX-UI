export type EvidenceState="PROVEN"|"OBSERVED"|"IN DEVELOPMENT"|"PLANNED";
export type BlueprintFigure={figureNumber:string;asset:string;classification:EvidenceState;caption:string;callouts?:string[];evidenceIds:string[]};
export type EngineeringDecision={decision:string;reason:string;alternatives:string[];tradeOff:string;evidenceIds:string[]};
export type EngineeringObservation={observation:string;context:string;implication:string;evidenceIds:string[]};
export type BlueprintSection={number:string;title:string;question:string;state:EvidenceState;body:string[];keyLearning?:string;outcome?:string;nextActivity?:string;workPackage?:string;figureIds?:string[];decision?:EngineeringDecision;observation?:EngineeringObservation;items?:string[]};
export type EvidenceRecord={id:string;question:string;type:string;asset:string;status:EvidenceState;establishes:string;doesNotEstablish:string;workPackage:string};
export type TechnologyBlueprint={slug:string;metadata:{document:string;documentType:string;version:string;date:string;currentStage:string;workPackage:string;technologyReadiness:string;status:string;confidentiality:string};sections:BlueprintSection[];figures:BlueprintFigure[];evidence:EvidenceRecord[]};
