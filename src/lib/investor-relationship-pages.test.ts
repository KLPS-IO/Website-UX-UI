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
  assert.match(page, /do not represent contracted partnerships unless expressly stated/);
  assert.doesNotMatch(page, /WearNex/);
});

test("adviser slide links to the supporting private data-room page", () => {
  const slides = source("src/components/data/slides.tsx");
  assert.match(slides, /data-room\?folder=Team%20%26%20Advisers/);
  assert.match(slides, /Team and adviser information in the private data room/);
});
