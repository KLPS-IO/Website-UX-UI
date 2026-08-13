export type Device={id:string;device_identifier:string;display_name:string;hardware_type:string;hardware_model:string;firmware_version?:string|null;transport:"usb_serial"|"ble"|"other";status:string;last_connected_at?:string|null};
export type Specimen={id:string;specimen_identifier:string;display_name:string;status:string;construction_notes?:string|null};
export type ActivityPurpose="engineering"|"calibration"|"controlled_test"|"real_world_wear"|"genuine_product_use";
export type TestSession={id:string;device_id:string;specimen_id:string;device_name?:string;specimen_name?:string;status:string;started_at:string;ended_at?:string|null;protocol_identifier?:string|null;activity_purpose:ActivityPurpose;analytics_population_snapshot?:string|null;analytics_eligible:false};
export type RawReading={observed_at:string;channel_identifier:string;raw_value:string;unit:null;sequence_number:number;adapter_identifier:string;adapter_version:string;transport:"usb_serial";source_payload:string;ingestion_metadata:Record<string,unknown>};
export type LabOverview={device:Device|null;specimen:Specimen|null;session:TestSession|null;latest_reading:(RawReading&{received_at?:string})|null};
