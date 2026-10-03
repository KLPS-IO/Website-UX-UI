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
  assert.match(room, /KLPS Technology Blueprint [-—] Engineering Record 01/);
  assert.match(room, /Version 1\.0 · August 2026 · WP1 · TRL 3/);
  assert.match(room, /newestVersionFirst/);
  assert.match(room, /selected === "Product & Technology"/);
  assert.match(room, /CompanyLegalOverview/);
  assert.match(room, /selected === "Company & Legal"/);
});

test("company and legal overview uses a standalone versioned investor disclosure", () => {
  const page = source("src/components/data-room/CompanyLegalOverview.tsx");
  const room = source("src/pages/DataRoom.tsx");
  const disclosure = source("src/config/investorDisclosure.ts");
  assert.doesNotMatch(room, /\/api\/finance\/company|normaliseCompanyLegal/);
  assert.match(page, /Investor legal disclosure/);
  assert.match(page, /Ownership, IP and governance/);
  assert.doesNotMatch(page, /Capitalisation · actual current position/);
  assert.match(page, /Corporate and investment readiness/);
  assert.match(disclosure, /Founder-only Financial OS records/);
  assert.match(disclosure, /version: "1\.0"/);
  assert.match(disclosure, /companyNumber: "16436591"/);
  assert.doesNotMatch(page, /vatRegistrationNumber|businessBankAccount|bankBalance/);
});

test("financials folder publishes the cap table, qualified forecast and linked pilot assumptions", () => {
  const room = source("src/components/data-room/GuestDataRoom.tsx");
  const page = source("src/components/data-room/InvestorFinancialSnapshot.tsx");
  const disclosure = source("src/config/investorDisclosure.ts");
  assert.match(room, /InvestorFinancialSnapshot/);
  assert.match(room, /Company and capital snapshot v1\.0/);
  for (const expected of ["Emma Mendez", "forecastSales: 9125", "customers: 50", "estimatedDirectCostPerUnit: 60", "amount: 7000", "introductoryPriceRange: \"£150–£200\"", "12-month financial forecast"])
    assert.match(disclosure, new RegExp(expected));
  assert.ok(disclosure.includes("sales: [450, 600, 800"));
  assert.ok(disclosure.includes("grossContribution: [270, 360, 500"));
  assert.match(page, /Capitalisation · actual current position/);
  assert.doesNotMatch(page, /Review the current cap table and ownership structure/);
  assert.match(page, /href="#founding-50"/);
  assert.match(page, /View assumptions/);
  assert.match(page, /Finance, commercial and product readiness/);
  assert.match(page, /View VAT and accounting basis/);
  assert.match(page, /View 12-month forecast/);
  assert.match(page, /View development conversations/);
  assert.match(page, /View technical blueprint/);
  assert.match(page, /Near-term capital deployment/);
  assert.match(page, /Ignitec proposal 915/);
  assert.match(page, /Cash required/);
  assert.match(page, /Not accepted/);
  assert.match(disclosure, /grossCashRequirement: 3060/);
  assert.match(disclosure, /correction requested · not accepted/);
  assert.doesNotMatch(page, /late-submission|£200 liability|26A2/i);
  assert.doesNotMatch(disclosure, /personal Start Up Loan|Universal Credit|Klarna|personal credit card/i);
});

test("private data room provides direct founder contact and verified KLPS social profiles", () => {
  const contact = source("src/components/data-room/DataRoomContact.tsx");
  const room = source("src/components/data-room/GuestDataRoom.tsx");
  const overview = source("src/components/data-room/CompanyOverview.tsx");
  const blueprint = source("src/pages/DataRoomTechnologyBlueprint.tsx");
  const guide = source("src/pages/DataRoomGuide.tsx");
  assert.match(room, /ContactEmmaButton/);
  assert.match(room, /DataRoomContactDialog/);
  assert.match(overview, /ContactEmmaButton/);
  assert.match(blueprint, /ContactEmmaButton/);
  assert.match(guide, /ContactEmmaButton/);
  assert.doesNotMatch(contact, /mailto:/);
  assert.match(contact, /navigator\.clipboard\.writeText/);
  assert.match(contact, /Click to copy email address/);
  assert.match(contact, /wa\.me\/447983417736/);
  assert.match(contact, /tel:\+447983417736/);
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
    "WearNex",
    "University of Manchester Henry Royce Institute",
    "Interactive Wear AG",
    "Ignitec Ltd",
    "Smart Garment People",
    "ADETEXS",
  ])
    assert.match(page, new RegExp(organisation));
  assert.match(page, /Outline project plan received/);
  assert.match(page, /Technical discovery meeting completed/);
  assert.match(page, /Follow-up scope requested/);
  assert.match(page, /Spoken, non-binding indications/);
  assert.match(page, /No quotation, order or development engagement was agreed/);
  assert.match(page, /Proposal received — correction requested/);
  assert.match(page, /Decision pending — not accepted/);
  assert.match(page, /Proposal 915/);
  assert.match(page, /Introductory outreach sent/);
  assert.match(page, /Concluded — no further action/);
  assert.match(page, /On pause — scope under review/);
  assert.match(page, /Awaiting response/);
  assert.match(page, /bg-emerald-50/);
  assert.match(page, /bg-amber-50/);
  assert.match(page, /bg-red-50/);
  assert.match(page, /do not represent contracted partnerships unless expressly stated/);
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
