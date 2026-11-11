import test from 'node:test';
import assert from 'node:assert/strict';
import { discoveryPath, discoverySource } from './discovery-followup.ts';
import { emptyInterview, INTERVIEW_VERSION, questionsForVersion } from './customer-interviews.ts';
test('public discovery links carry only a bounded campaign label', () => {
  assert.equal(discoverySource('?discovery=cafe'), 'cafe');
  assert.equal(discoverySource('?discovery=someone@example.com'), '');
  assert.equal(discoverySource('?discovery='+ 'a'.repeat(49)), '');
  assert.equal(discoveryPath('/body-discovery', 'cafe'), '/body-discovery?discovery=cafe');
});
test('live discovery starts as completed with an open offer and preserves earlier scripts', () => {
  const record = emptyInterview();
  assert.equal(record.status, 'completed');
  assert.equal(record.offer, '');
  assert.equal(record.version, INTERVIEW_VERSION);
  assert.match(questionsForVersion(record.version)[0][2], /tried or used recently/);
  assert.match(questionsForVersion('klps-discovery-v4')[0][2], /last time you bought/);
  assert.match(questionsForVersion('klps-discovery-v3')[0][2], /past month/);
  assert.doesNotMatch(questionsForVersion(record.version).map(q => q[2]).join(' '), /bundle|box/);
});
