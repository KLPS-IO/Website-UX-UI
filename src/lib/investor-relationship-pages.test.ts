import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const source = (file: string) => readFileSync(path.resolve(file), "utf8");

test("data room provides dedicated team and development-conversation pages", () => {
  const room = source("src/components/data-room/GuestDataRoom.tsx");
  assert.match(room, /TeamAdvisersOverview/);
  assert.match(room, /DevelopmentConversations/);
  assert.match(room, /title: "Development Conversations"/);
  assert.match(room, /hasBuiltInOverview/);
  assert.match(room, /selected === "Pitch Deck"/);
  assert.match(room, /"Team & Advisers": "Founder and adviser profiles"/);
  assert.match(room, /"Development Conversations": "Research and supplier engagement"/);
  assert.match(room, /"Product & Technology": "Versioned engineering records"/);
  assert.match(room, /KLPS Technology Blueprint — Engineering Record 01/);
  assert.match(room, /Version 1\.0 · August 2026 · WP1 · TRL 3/);
  assert.match(room, /newestVersionFirst/);
  assert.match(room, /selected === "Product & Technology"/);
  assert.match(room, /CompanyLegalOverview/);
  assert.match(room, /selected === "Company & Legal"/);
});

test("company and legal overview is a safe projection of the canonical FOS record", () => {
  const page = source("src/components/data-room/CompanyLegalOverview.tsx");
  const room = source("src/pages/DataRoom.tsx");
  assert.match(room, /\/api\/data-room\/company/);
  assert.match(room, /\/api\/finance\/company/);
  assert.match(room, /normaliseCompanyLegal/);
  assert.match(page, /Legal identity/);
  assert.match(page, /Ownership, IP and compliance position/);
  assert.match(page, /Working fundraising scenarios are excluded/);
  assert.match(page, /Sensitive tax identifiers, bank details and internal legal notes are excluded/);
  assert.doesNotMatch(page, /vatRegistrationNumber|businessBankAccount|bankBalance/);
});

test("private data room provides direct founder contact and verified KLPS social profiles", () => {
  const contact = source("src/components/data-room/DataRoomContact.tsx");
  const room = source("src/components/data-room/GuestDataRoom.tsx");
  assert.match(room, /DataRoomContact/);
  assert.match(contact, /mailto:emmamendez@klps\.co\.uk/);
  assert.match(contact, /wa\.me\/447983417736/);
  assert.match(contact, /tel:\+447983417736/);
  assert.match(contact, /No contact form or intermediary inbox is used/);
  for (const expected of [
    "instagram.com/klps_wear",
    "x.com/klps_wear",
    "youtube.com/@KLPS-official",
    "linkedin.com/in/klpswear",
    "facebook.com/profile.php?id=61592718058230",
    "tiktok.com/@klps_wear",
    "https://klps.co.uk",
  ]) assert.match(contact, new RegExp(expected.replace(/[.?+^$[\]\\(){}|-]/g, "\\$&")));
  assert.doesNotMatch(contact, /<form/i);
});

test("team page explains roles without implying executive authority", () => {
  const team = source("src/components/data-room/TeamAdvisersOverview.tsx");
  for (const name of ["Emma Mendez", "Oyin A.", "Muneeb A.", "Imran K."])
    assert.ok(team.includes(name));
  assert.match(team, /do not imply employment, executive authority or a full-time operating commitment/);
  assert.match(team, /Development%20Conversations/);
});

test("engagement page distinguishes outreach, proposals and non-contracted conversations", () => {
  const page = source("src/components/data-room/DevelopmentConversations.tsx");
  for (const organisation of [
    "University of Manchester Henry Royce Institute",
    "Interactive Wear AG",
    "Ignitec Ltd",
    "Smart Garment People",
    "ADETEXS",
  ])
    assert.match(page, new RegExp(organisation));
  assert.match(page, /Outline project plan received/);
  assert.match(page, /Proposal pending/);
  assert.match(page, /Introductory outreach sent/);
  assert.match(page, /Concluded — no further action/);
  assert.match(page, /On pause — scope under review/);
  assert.match(page, /Awaiting response/);
  assert.match(page, /bg-emerald-50/);
  assert.match(page, /bg-amber-50/);
  assert.match(page, /bg-red-50/);
  assert.match(page, /do not represent contracted partnerships unless expressly stated/);
  assert.doesNotMatch(page, /WearNex/);
});

test("adviser slide links to the supporting private data-room page", () => {
  const slides = source("src/components/data/slides.tsx");
  assert.match(slides, /data-room\?folder=Team%20%26%20Advisers/);
  assert.match(slides, /Team and adviser information in the private data room/);
});

test("cover prototype media remains clear of the headline", () => {
  const slides = source("src/components/data/slides.tsx");
  assert.match(slides, /top: 350,\s+left: 1040,/);
});
