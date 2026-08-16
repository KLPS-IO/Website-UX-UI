import type {RawReading,Transport} from "../types";
export type AdapterChannelDefinition={identifier:string;displayName:string;rawDataType:"integer"|"decimal"|"boolean"|"text"|"binary";unit:string|null;stage:"raw"};
export type AdapterDescriptor={identifier:string;version:string;transport:Transport;channels:readonly AdapterChannelDefinition[]};
export interface HardwareAdapter{readonly descriptor:AdapterDescriptor;connect():Promise<void>;read(onReading:(reading:RawReading)=>void,signal:AbortSignal):Promise<void>;disconnect():Promise<void>}
