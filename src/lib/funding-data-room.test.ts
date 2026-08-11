import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fundingApplications,visibleFundingApplications } from "../config/fundingApplications.ts";
import { countFundingAnswer } from "../config/womenTechEuApplication.ts";

test("Funding is a native authenticated Data Room category",()=>{
  const room=readFileSync(path.resolve("src/pages/DataRoom.tsx"),"utf8");
  assert.match(room,/"Funding"/);assert.match(room,/FundingWorkspace/);assert.match(room,/onViewDocument=\{viewDocument\}/);
});

test("Innovate UK preserves one protected historical submission reference",()=>{
  const historical=fundingApplications.find(item=>item.id==="innovate-uk-historical")!;
  assert.equal(historical.programme,"Innovate UK");assert.equal(historical.status,"Submitted / Historical");
  assert.equal(historical.finalSubmittedVersion?.filename,"Innovation Funding Application.pdf");
  assert.equal(historical.finalSubmittedVersion?.sha256,"7a4944981518b0eadf97965b60f2cda561a0f60dc0f727761cc686de895e0dd3");
  assert.equal(historical.sections.length,0);assert.equal(historical.workingDrafts.length,0);
});

test("EU Women is an evidence-led draft and remains founder-admin only",()=>{
  const workspace=fundingApplications.find(item=>item.id==="eu-women-tech-eu")!;
  assert.equal(workspace.programme,"Women TechEU");assert.equal(workspace.status,"In development");assert.equal(workspace.visibility,"founder_admin");
  assert.deepEqual(workspace.sections.map(section=>section.id),["eligibility","legal-contact","impact","excellence-company","excellence-technology","implementation","ethics","declaration"]);
  assert.ok(workspace.sections.flatMap(section=>section.questions).length>40);
  assert.equal(workspace.supportingDocuments.length,0);assert.equal(workspace.workingDrafts.length,0);assert.equal(workspace.finalSubmittedVersion,null);assert.equal(workspace.fundingAmount,null);
  assert.deepEqual(visibleFundingApplications(false).map(item=>item.id),["innovate-uk-historical"]);
  assert.deepEqual(visibleFundingApplications(true).map(item=>item.id),["innovate-uk-historical","eu-women-tech-eu"]);
});

test("every drafted Women TechEU answer respects its exact word or character limit",()=>{
  const workspace=fundingApplications.find(item=>item.id==="eu-women-tech-eu")!;
  for(const question of workspace.sections.flatMap(section=>section.questions)){
    if(!question.answer||!question.limit)continue;
    assert.ok(countFundingAnswer(question.answer,question.limit.unit)<=question.limit.maximum,`${question.id} exceeds ${question.limit.maximum} ${question.limit.unit}`);
  }
});

test("TRL, financial, ethics and declaration uncertainty is never silently completed",()=>{
  const questions=fundingApplications.find(item=>item.id==="eu-women-tech-eu")!.sections.flatMap(section=>section.questions);
  assert.equal(questions.find(item=>item.id==="3.2-02")?.status,"eligibility_review");
  assert.equal(questions.find(item=>item.id==="3.1-03")?.answer,null);
  assert.equal(questions.find(item=>item.id==="3.1-04")?.answer,null);
  assert.equal(questions.find(item=>item.id==="5-10")?.answer,null);
  assert.equal(questions.find(item=>item.id==="6-01")?.answer,null);
});
