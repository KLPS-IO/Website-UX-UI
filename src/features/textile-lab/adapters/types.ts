import type {RawReading} from "../types";
export interface HardwareAdapter{readonly identifier:string;readonly version:string;readonly transport:"usb_serial";connect():Promise<void>;read(onReading:(reading:RawReading)=>void,signal:AbortSignal):Promise<void>;disconnect():Promise<void>}
