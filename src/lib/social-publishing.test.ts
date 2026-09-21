import test from 'node:test';
import assert from 'node:assert/strict';
import {xPublishingEnabled,canPublishJob} from './social-publishing.ts';
test('X card checks stored grant and connected state, not only backend feature availability',()=>{
 const p={provider:'x',publishing_enabled:true,connection:{status:'connected',granted_scopes:['tweet.read','users.read','offline.access']}};
 assert.equal(xPublishingEnabled(p),false);p.connection.granted_scopes.push('tweet.write');assert.equal(xPublishingEnabled(p),true);
 p.connection.status='expired';assert.equal(xPublishingEnabled(p),false);assert.equal(xPublishingEnabled({...p,provider:'facebook'}),false);
});
test('publish button requires approved current content; generated, scheduled and unknown jobs cannot publish',()=>{
 const j={status:'approved',execution_state:'not_started',approval_fingerprint:'same',current_fingerprint:'same',retry_after:null,needs_review:false};assert.equal(canPublishJob(j),true);
 for(const status of ['draft','scheduled','publishing','published','failed'])assert.equal(canPublishJob({...j,status}),false);
 assert.equal(canPublishJob({...j,current_fingerprint:'changed'}),false);assert.equal(canPublishJob({...j,execution_state:'unknown',needs_review:true}),false);
 assert.equal(canPublishJob({...j,status:'retry',execution_state:'rejected',retry_after:new Date(Date.now()+60000).toISOString()}),false);
});
