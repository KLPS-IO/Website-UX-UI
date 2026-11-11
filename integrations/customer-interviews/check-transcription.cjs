const assert=require('node:assert/strict');const path=require('node:path');const {createRequire}=require('node:module');
const root='/Users/emmamendez/Documents/Source/KLPS-Core';const core=createRequire(path.join(root,'package.json'));
process.env.TS_NODE_TRANSPILE_ONLY='true';process.env.TS_NODE_PROJECT=path.join(root,'tsconfig.json');process.env.TS_NODE_COMPILER_OPTIONS=JSON.stringify({module:'Node16',moduleResolution:'Node16'});core('ts-node/register');
function stub(relative,exports){const filename=path.join(root,relative);require.cache[filename]={id:filename,filename,loaded:true,exports};}
const interview='e0000000-0000-0000-0000-000000000000';const jobs=new Map();let wakeups=0;
const record={audioConsent:true,audio:[{questionKey:'story',objectKey:'private/test/audio'}]};
stub('server/src/storage/postgres.client.ts',{pool:{query:async(sql,args=[])=>{
 if(sql==='SELECT payload FROM research_field_interviews WHERE id=$1')return {rows:args[0]===interview?[{payload:record}]:[]};
 if(sql.startsWith('SELECT * FROM research_field_transcripts'))return {rows:[...jobs.values()]};
 if(sql.includes('INSERT INTO research_field_transcripts')){if(!jobs.size)jobs.set('f0000000-0000-0000-0000-000000000000',{id:'f0000000-0000-0000-0000-000000000000',interview_id:args[0],question_key:args[1],audio_object_key:args[2],status:'queued',revision:0,original_text:null,edited_text:null});return {rows:[]};}
 if(sql.includes('UPDATE research_field_transcripts t SET')){const row=jobs.get(args[0]);if(!row||row.revision!==args[4]||!['draft','approved'].includes(row.status))return {rows:[]};const same=row.edited_text===args[2];row.speaker_spans=args[5]!==null&&args[5]!==undefined?JSON.parse(args[5]):same?(row.speaker_spans||[]):[];row.speakers_reviewed=args[6]!==null&&args[6]!==undefined?args[6]:same?Boolean(row.speakers_reviewed):false;row.edited_text=args[2];row.status=args[3];row.revision++;return {rows:[row]};}
 return {rows:[]};
}}});
stub('server/src/services/data-room.service.ts',{requireDataRoomAuth:(req,res,next)=>req.headers['x-test-role']?next():res.sendStatus(401),requireAdmin:(req,res,next)=>req.headers['x-test-role']==='founder_admin'?next():res.sendStatus(403)});
stub('server/src/services/r2.service.ts',{readFromR2:async()=>({body:Buffer.from('test'),contentType:'audio/webm'})});
(async()=>{
 const service=core(path.join(root,'server/src/services/customer-transcription.service.ts'));
 let calls=0;const mock=async(url,options)=>{if(String(url)==='data:,')return new Response('');calls++;assert.equal(String(url),'https://api.openai.com/v1/audio/transcriptions');const form=await new Request(url,options).formData();assert.equal(form.get('model'),'gpt-transcribe');assert.match(form.get('prompt'),/UK English/);assert.equal(form.get('file').name,'answer.webm');return new Response(JSON.stringify({text:'Test participant response.'}),{status:200,headers:{'content-type':'application/json'}});};
 assert.equal(await service.transcribeRecording(Buffer.from('test'),'audio/webm','test-key',mock),'Test participant response.');assert.equal(calls,1);
 let failures=0;await assert.rejects(()=>service.transcribeRecording(Buffer.from('test'),'audio/webm','test-key',async(url)=>{if(String(url)==='data:,')return new Response('');failures++;return new Response(JSON.stringify({error:{message:'sensitive-provider-detail',type:'rate_limit_error'}}),{status:429,headers:{'content-type':'application/json'}});}));assert.equal(failures,1);assert.doesNotMatch(service.safeTranscriptionError({status:429,message:'secret'}),/secret/);
 stub('server/src/services/customer-transcription.service.ts',{TRANSCRIPTION_MODEL:'gpt-transcribe',runTranscriptionQueue:async()=>{wakeups++;}});
 const express=core('express');const app=express();app.use(express.json());app.use('/api/research/interviews',core(path.join(root,'server/src/routes/customer-transcription.routes.ts')).default);
 const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));const url=`http://127.0.0.1:${server.address().port}/api/research/interviews/${interview}/transcripts`;
 const request=(method='GET',body,role='founder_admin',suffix='')=>fetch(url+suffix,{method,headers:{'content-type':'application/json',...(role?{'x-test-role':role}:{})},...(body?{body:JSON.stringify(body)}:{})});
 try{
  delete process.env.OPENAI_API_KEY;assert.equal((await request('GET',null,'')).status,401);assert.equal((await request('GET',null,'investor')).status,403);assert.equal((await request('POST',{})).status,503);
  process.env.OPENAI_API_KEY='test-only';assert.equal((await request('POST',{})).status,202);assert.equal((await request('POST',{})).status,202);assert.equal(jobs.size,1);assert.equal(wakeups,2);
  const listing=await(await request()).json();assert.equal(listing.transcripts[0].audio_object_key,undefined);
  const reflection={...listing.transcripts[0],id:'d0000000-0000-0000-0000-000000000000',question_key:'reflection__11111111-1111-4111-8111-111111111111',audio_object_key:'private/test/reflection',status:'approved',edited_text:'Founder hypothesis.',speaker_spans:[{start:0,end:19,role:'participant'}],speakers_reviewed:true};
  record.audio.push({questionKey:'reflection__11111111-1111-4111-8111-111111111111',objectKey:'private/test/reflection'});jobs.set(reflection.id,reflection);
  const withReflection=await(await request()).json();const founder=withReflection.transcripts.find(t=>t.question_key.startsWith('reflection'));
  assert.equal(founder.evidence_kind,'founder_reflection');assert.equal(founder.participant_analysis_ready,false);assert.equal(founder.participant_text,null);assert.deepEqual(founder.participant_passages,[]);
  jobs.delete(reflection.id);record.audio.pop();
  const job=[...jobs.values()][0];job.status='draft';job.original_text='Original unedited words.';job.edited_text=job.original_text;
  assert.equal((await request('PATCH',{text:'Corrected words.',approve:true,revision:0},'founder_admin','/'+job.id)).status,200);assert.equal(job.status,'approved');assert.equal(job.original_text,'Original unedited words.');
  assert.equal((await request('PATCH',{text:'Old edits.',approve:false,revision:0},'founder_admin','/'+job.id)).status,409);assert.equal(job.edited_text,'Corrected words.');
  assert.equal((await request('PATCH',{text:'Later edits.',approve:false,revision:1},'founder_admin','/'+job.id)).status,200);assert.equal(job.status,'draft');
  const labelled='Emma question. Participant answer.';const split=labelled.indexOf('Participant');const spans=[{start:0,end:split,role:'emma'},{start:split,end:labelled.length,role:'participant'}];
  assert.equal((await request('PATCH',{text:labelled,approve:true,revision:job.revision,speakerSpans:[{start:0,end:999,role:'emma'}],speakersReviewed:true},'founder_admin','/'+job.id)).status,400);
  assert.equal((await request('PATCH',{text:labelled,approve:true,revision:job.revision,speakerSpans:[spans[0]],speakersReviewed:true},'founder_admin','/'+job.id)).status,400);
  const reviewed=await(await request('PATCH',{text:labelled,approve:true,revision:job.revision,speakerSpans:spans,speakersReviewed:true},'founder_admin','/'+job.id)).json();assert.equal(reviewed.transcript.participant_text,'Participant answer.');assert.equal(reviewed.transcript.participant_analysis_ready,true);assert.equal(job.original_text,'Original unedited words.');
  const oldClient=await(await request('PATCH',{text:'Changed wording.',approve:true,revision:job.revision},'founder_admin','/'+job.id)).json();assert.equal(oldClient.transcript.participant_text,null);assert.equal(oldClient.transcript.speakers_reviewed,false);
  record.audio=[];assert.equal((await(await request()).json()).transcripts.length,0);
  console.log('PASS: SDK request/model, no implicit provider retries, sanitized errors, founder-only routes, missing-key handling, queue deduplication, private source references, immutable original, explicit approval, revision conflicts and stale audio filtering. No real audio or API key used.');
 }finally{server.close();delete process.env.OPENAI_API_KEY;}
})().catch(e=>{console.error(e);process.exitCode=1;});
