/// <reference types="node" />
import assert from "node:assert/strict";
import test from "node:test";
import {
  LINKEDIN_OAUTH_ERROR_MESSAGES,
  processLinkedInOAuthReturn,
  readLinkedInOAuthReturn,
  removeSocialOAuthResultParameters,
} from "./growth-social-oauth-return.ts";

test("successful LinkedIn return refreshes connections with identity-only copy", async () => {
  let refreshes=0;
  let replacement="";
  const result=await processLinkedInOAuthReturn(
    "https://klps.co.uk/innovation-lab/funnel/settings?keep=yes&social_provider=linkedin&social_status=connected",
    async () => { refreshes += 1; return []; },
    (url) => { replacement=url; },
  );
  assert.equal(refreshes,1);
  assert.equal(result?.status,"connected");
  assert.match(result?.message ?? "",/member identity connected/i);
  assert.match(result?.message ?? "",/Publishing is not enabled/);
  assert.doesNotMatch(result?.message ?? "",/publishing enabled/i);
  assert.equal(
    replacement,
    "/innovation-lab/funnel/settings?keep=yes",
  );
});

test("successful Meta return requires canonical connected status", async () => {
  const result = await processLinkedInOAuthReturn(
    "https://klps.co.uk/innovation-lab/funnel/settings?social_provider=facebook&social_status=connected",
    async () => [{provider:"facebook",connection:{status:"connected"}}],
    () => undefined,
  );
  assert.equal(result?.provider,"facebook");
  assert.match(result?.message ?? "",/Page and linked Instagram professional discovery/);
  assert.match(result?.message ?? "",/Publishing is not enabled/);
});

test("successful TikTok return requires canonical identity and uses identity-only copy", async () => {
  const result=await processLinkedInOAuthReturn(
    "https://klps.co.uk/innovation-lab/funnel/settings?social_provider=tiktok&social_status=connected",
    async () => [{provider:"tiktok",connection:{status:"connected"}}],
    () => undefined
  );
  assert.equal(result?.provider,"tiktok");
  assert.equal(result?.message,"TikTok identity connected");
  assert.equal(await processLinkedInOAuthReturn(
    "https://klps.co.uk/innovation-lab/funnel/settings?social_provider=tiktok&social_status=connected",
    async () => [{provider:"tiktok",connection:{status:"disconnected"}}],
    () => undefined
  ),null);
});

test("successful X return requires canonical identity and uses identity-only copy", async () => {
  const result=await processLinkedInOAuthReturn(
    "https://klps.co.uk/innovation-lab/funnel/settings?social_provider=x&social_status=connected",
    async () => [{provider:"x",connection:{status:"connected"}}],
    () => undefined
  );
  assert.equal(result?.provider,"x");
  assert.equal(result?.message,"X identity connected");
  assert.equal(await processLinkedInOAuthReturn(
    "https://klps.co.uk/innovation-lab/funnel/settings?social_provider=x&social_status=connected",
    async () => [{provider:"x",connection:{status:"disconnected"}}],
    () => undefined
  ),null);
});

test("stale Meta success parameters do not show success for non-connected canonical states", async () => {
  for (const connection of [
    {status:"connecting"},
    {status:"disconnected"},
    {status:"unhealthy"},
    null,
  ]) {
    let replacement="";
    const result=await processLinkedInOAuthReturn(
      "https://klps.co.uk/innovation-lab/funnel/settings?keep=yes&social_provider=facebook&social_status=connected",
      async () => [{provider:"facebook",connection}],
      url => { replacement=url; },
    );
    assert.equal(result,null);
    assert.equal(replacement,"/innovation-lab/funnel/settings?keep=yes");
  }
  assert.equal(await processLinkedInOAuthReturn(
    "https://klps.co.uk/innovation-lab/funnel/settings?social_provider=facebook&social_status=connected",
    async () => [{provider:"linkedin",connection:{status:"connected"}}],
    () => undefined,
  ),null);
});

test("every controlled LinkedIn failure maps to fixed safe copy", () => {
  for (const [errorCode,message] of Object.entries(
    LINKEDIN_OAUTH_ERROR_MESSAGES,
  )) {
    const result=readLinkedInOAuthReturn(
      `?social_provider=linkedin&social_status=failed&social_error=${errorCode}`,
    );
    assert.equal(result?.status,"failed");
    assert.equal(result?.message,message);
    assert.doesNotMatch(message,/access[_-]?token|refresh[_-]?token|client[_-]?secret/i);
  }
});

test("unknown provider, status and error values are ignored without echoing them", () => {
  for (const search of [
    "?social_provider=attacker&social_status=connected",
    "?social_provider=linkedin&social_status=unexpected",
    "?social_provider=linkedin&social_status=failed&social_error=raw-provider-description",
  ]) {
    assert.equal(readLinkedInOAuthReturn(search),null);
  }
});

test("OAuth parameters are removed while unrelated query and hash values survive", () => {
  assert.equal(
    removeSocialOAuthResultParameters(
      "https://klps.co.uk/innovation-lab/funnel/settings?tab=connections&social_provider=linkedin&social_status=failed&social_error=access_denied#linkedin",
    ),
    "/innovation-lab/funnel/settings?tab=connections#linkedin",
  );
});

test("failed re-authorisation refreshes rather than removing an existing connection", async () => {
  const existingConnection={ provider:"linkedin",status:"connected",name:"Emma Mendez" };
  let visibleConnection=existingConnection;
  const result=await processLinkedInOAuthReturn(
    "https://klps.co.uk/innovation-lab/funnel/settings?social_provider=linkedin&social_status=failed&social_error=access_denied",
    async () => {
      visibleConnection=existingConnection;
      return [{provider:"linkedin",connection:{status:"connected"}}];
    },
    () => undefined,
  );
  assert.equal(result?.status,"failed");
  assert.equal(visibleConnection.status,"connected");
  assert.match(result?.message ?? "",/existing healthy connection is unchanged/i);
});
