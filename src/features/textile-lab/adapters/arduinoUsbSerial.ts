import type {RawReading} from "../types";
import type {HardwareAdapter} from "./types";
type Port={open(options:{baudRate:number}):Promise<void>;close():Promise<void>;readable:ReadableStream<Uint8Array>|null};
type SerialApi={requestPort():Promise<Port>};
export function parseArduinoSerialLine(line:string,sequence:number):RawReading|null{
 const parsed=line.trim();if(!parsed)return null;
 const a0=parsed.match(/^a0\s+reading\s*:\s*(-?\d+(?:\.\d+)?)$/i);const labelled=parsed.match(/^stretch\s*:\s*(-?\d+(?:\.\d+)?)$/i);const numeric=parsed.match(/^-?\d+(?:\.\d+)?$/);const matched=a0||labelled||numeric;
 return {observed_at:new Date().toISOString(),channel_identifier:a0?"electrical_raw_a0":labelled||numeric?"stretch_raw":"serial_line",raw_value:a0?.[1]??labelled?.[1]??numeric?.[0]??parsed,unit:null,sequence_number:sequence,adapter_identifier:"arduino-usb-serial",adapter_version:"1.1.0",transport:"usb_serial",source_payload:line,ingestion_metadata:{timestamp_source:"host_receive_time",capture_mode:"usb_serial",parsed_numeric:Boolean(matched),raw_data_type:matched?"decimal":"text"}};
}
export class ArduinoUsbSerialAdapter implements HardwareAdapter{
 readonly descriptor={identifier:"arduino-usb-serial",version:"1.1.0",transport:"usb_serial" as const,channels:[{identifier:"electrical_raw_a0",displayName:"A0 electrical raw channel",rawDataType:"decimal" as const,unit:null,stage:"raw" as const}]};private port:Port|null=null;private reader:ReadableStreamDefaultReader<Uint8Array>|null=null;private baudRate:number;constructor(baudRate=9600){this.baudRate=baudRate;}
 async connect(){const serial=(navigator as Navigator&{serial?:SerialApi}).serial;if(!serial)throw new Error("Web Serial is not available in this browser. Use desktop Chrome or Edge over USB.");this.port=await serial.requestPort();await this.port.open({baudRate:this.baudRate});}
 async read(onReading:(r:RawReading)=>void,signal:AbortSignal){if(!this.port?.readable)throw new Error("Serial device is not connected.");const reader=this.port.readable.getReader();this.reader=reader;const decoder=new TextDecoder();let pending="",sequence=0;try{while(!signal.aborted){const {value,done}=await reader.read();if(done)break;pending+=decoder.decode(value,{stream:true});const lines=pending.split(/\r?\n/);pending=lines.pop()??"";for(const line of lines){const reading=parseArduinoSerialLine(line,++sequence);if(reading)onReading(reading);}}}finally{reader.releaseLock();this.reader=null;}}
 async disconnect(){if(this.reader)await this.reader.cancel();if(this.port){await this.port.close();this.port=null;}}
}
