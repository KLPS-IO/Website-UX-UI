export const garmentOptions = [
 {id:'underwear',label:'Underwear',detail:'Briefs, shorts or another everyday underwear cut',path:'M20 24h80l-8 26-18 26H46L28 50Z M28 50l18-8m46 8-18-8'},
 {id:'gymwear',label:'Gymwear',detail:'Leggings or shorts worn during activity',path:'M35 16h50l8 78H65l-5-48-5 48H27Z M35 29h50'},
 {id:'everyday',label:'Everyday clothing',detail:'A vest, top or other daily layer',path:'M42 18l18 8 18-8 24 18-14 20-10-7v48H42V49l-10 7-14-20Z'},
 {id:'sleepwear',label:'Sleep / loungewear',detail:'A soft layer for home or overnight wear',path:'M40 18l20 12 20-12 23 23-18 16-7-9v47H42V48l-7 9-18-16Z M60 30v65'},
 {id:'accessory',label:'Separate wearable',detail:'A band or accessory instead of clothing',path:'M24 42q36-28 72 0v32q-36 28-72 0Z M24 42q36 28 72 0 M50 50h20v25H50Z'},
 {id:'app',label:'App / diary only',detail:'No sensing clothing or body-worn hardware',path:'M40 14h40v86H40Z M40 27h40 M40 83h40 M56 91h8'},
 {id:'none',label:'None of these',detail:'No product, another approach, or no useful need',path:'M30 30l60 60 M90 30L30 90'},
] as const;
export const techOptions=[
 {id:'clip',label:'Removable clip pod',detail:'A separate small unit clipped to a garment. Remove for washing; position, size and charging are untested.'},
 {id:'pocket',label:'Removable pocket pod',detail:'A separate small unit held in a sewn pocket. Remove for washing; bulk, fit and charging are untested.'},
 {id:'embedded',label:'Sensing within fabric',detail:'Explore textile sensing with less visible hardware. Power, connections, washing and durability still need engineering; this does not mean electronics-free.'},
 {id:'none',label:'No body-worn tech',detail:'App/diary, no product or another approach.'},
] as const;
export const concernOptions=['Bloating / abdominal changes','Period / cycle changes','Weight / size changes','Clothing fit / comfort','Energy / wellbeing','Something else','No current concern','Prefer not to say'];
export const fabricOptions=['Cotton-rich feel','Soft stretch / modal-like feel','Smooth technical / gym fabric','Seamless feel','Natural-fibre preference','No preference','Other / unsure'];
export const techConcerns=['Intimate-area / organ proximity','Skin contact / irritation','Heat','Wireless / emissions questions','Battery / charging','Bulk / visibility','Washability / lifespan','Accuracy / misleading insights','Data privacy / access','None raised','Other'];
export type ConceptAnswers={tested:boolean;garment:string;garmentReason:string;technology:string;technologyReason:string;fabric:string;fabricReason:string;style:string;wardrobe:string;routine:string;mainConcern:string;concernOrigin:string;insightNeed:string;insightAction:string;techConcerns:string[];safetyWords:string;proofNeeded:string;burden:string;ageBand:string;wearContext:string;priceBasis:string;order:string[]};
export function emptyConcepts(id:string):ConceptAnswers{const n=parseInt(id.slice(0,8),16)%garmentOptions.length;return {tested:false,garment:'',garmentReason:'',technology:'',technologyReason:'',fabric:'',fabricReason:'',style:'',wardrobe:'',routine:'',mainConcern:'',concernOrigin:'not coded',insightNeed:'not asked',insightAction:'',techConcerns:[],safetyWords:'',proofNeeded:'',burden:'',ageBand:'not asked',wearContext:'',priceBasis:'',order:[...garmentOptions.slice(n),...garmentOptions.slice(0,n)].map(o=>o.id)};}
