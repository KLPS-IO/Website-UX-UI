import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the actual session normalizer: production sessions currently omit names.
const source = readFileSync(new URL('../pages/DataRoom.tsx', import.meta.url), 'utf8');
const helpers = source.slice(source.indexOf('const isRecord ='), source.indexOf('const DATA_ROOM_WATERMARK'));
const normalizers = source.slice(source.indexOf('const normaliseUser ='), source.indexOf('const getSession ='));
const script = ts.transpile(helpers + normalizers + '\n normaliseSession(payload);');

test('authenticated accounts without names retain their session and use the welcome fallback', () => {
  for (const nameFields of [{}, {name:null}, {first_name:123}, {first_name:'   '}]) {
    const result = vm.runInNewContext(script, {payload:{authenticated:true,user:{email:'guest@example.test',role:'authorised_user',...nameFields}}});
    assert.equal(result.authenticated,true);
    assert.equal(result.user.firstName,undefined);
  }
});
test('authenticated names display the first name and founder access remains intact', () => {
  const result = vm.runInNewContext(script, {payload:{authenticated:true,user:{email:'founder@example.test',name:'Emma Mendez',is_admin:true}}});
  assert.equal(result.user.firstName,'Emma');
  assert.equal(result.user.isAdmin,true);
});
