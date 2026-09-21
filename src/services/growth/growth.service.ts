import { authenticatedApi } from "@/lib/authenticated-api";
import type {
  CommunityPeopleResponse,
  CommunityPerson,
  CommunitySummary,
  GrowthMission,
  MissionCandidate,
  GrowthRecord,
  GrowthResource,
  GrowthStrategy,
  MissionControl,
  SocialProviderOverview,
  SocialPublishJob,
} from "@/types/growth";

export const growthService = {
  workspace: async () =>
    (await authenticatedApi<{ status: "success"; workspace: GrowthRecord }>("/api/growth/workspace")).workspace,
  updateWorkspace: async (payload: Record<string, unknown>) =>
    (await authenticatedApi<{ status: "success"; workspace: GrowthRecord }>("/api/growth/workspace", { method: "PATCH", body: JSON.stringify(payload) })).workspace,
  missionControl: async () =>
    (await authenticatedApi<{ status: "success"; mission_control: MissionControl }>(
      "/api/growth/mission-control",
    )).mission_control,
  strategy: async () =>
    (await authenticatedApi<{ status: "success"; strategy: GrowthStrategy }>(
      "/api/growth/strategy",
    )).strategy,
  updateStrategy: async (payload: Partial<GrowthStrategy>) =>
    (await authenticatedApi<{ status: "success"; strategy: GrowthStrategy }>(
      "/api/growth/strategy",
      { method: "PATCH", body: JSON.stringify(payload) },
    )).strategy,
  list: async <T extends GrowthRecord = GrowthRecord>(
    resource: GrowthResource,
    filters: Record<string, string> = {},
  ) => {
    const query = new URLSearchParams(filters).toString();
    const response = await authenticatedApi<
      { status: "success" } & Record<string, T[]>
    >(`/api/growth/${resource}${query ? `?${query}` : ""}`);
    return response[resource];
  },
  create: async <T extends GrowthRecord = GrowthRecord>(
    resource: GrowthResource,
    payload: Record<string, unknown>,
  ) =>
    (await authenticatedApi<{ status: "success"; record: T }>(
      `/api/growth/${resource}`,
      { method: "POST", body: JSON.stringify(payload) },
    )).record,
  update: async <T extends GrowthRecord = GrowthRecord>(
    resource: GrowthResource,
    id: string,
    payload: Record<string, unknown>,
  ) =>
    (await authenticatedApi<{ status: "success"; record: T }>(
      `/api/growth/${resource}/${id}`,
      { method: "PATCH", body: JSON.stringify(payload) },
    )).record,
  updateMission: (id: string, payload: Partial<GrowthMission>) =>
    growthService.update<GrowthMission>("missions", id, payload),
  acceptMissionCandidate: async (candidate: MissionCandidate, missionDate: string) =>
    (await authenticatedApi<{ status: "success"; mission: GrowthMission }>(
      "/api/growth/mission-candidates/accept",
      {
        method: "POST",
        body: JSON.stringify({
          candidate_key: candidate.deduplication_key,
          mission_date: missionDate,
        }),
      },
    )).mission,
  dismissMissionCandidate: async (candidate: MissionCandidate) =>
    (await authenticatedApi<{
      status: "success";
      dismissal: {
        id: string;
        candidate_key: string;
        candidate_type: string;
        dismissed_at: string;
      };
    }>("/api/growth/mission-candidates/dismiss", {
      method: "POST",
      body: JSON.stringify({
        candidate_key: candidate.deduplication_key,
        candidate_type: candidate.candidate_type,
      }),
    })).dismissal,
  completeMission: async (
    id: string,
    payload: { manual_close?: boolean; manual_close_reason?: string } = {},
  ) =>
    authenticatedApi<{
      status: "success";
      mission: GrowthMission;
      evaluation: { satisfied: boolean; message: string };
    }>(`/api/growth/missions/${id}/complete`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  communitySummary: async () =>
    (await authenticatedApi<{ status: "success"; summary: CommunitySummary }>(
      "/api/growth/community/summary",
    )).summary,
  communityPeople: async (filters: Record<string, string> = {}) => {
    const query = new URLSearchParams(filters).toString();
    return authenticatedApi<{ status: "success" } & CommunityPeopleResponse>(
      `/api/growth/community/people${query ? `?${query}` : ""}`,
    );
  },
  communityPerson: async (id: string) =>
    (await authenticatedApi<{ status: "success"; person: CommunityPerson }>(
      `/api/growth/community/people/${id}`,
    )).person,
  reviewCommunityPerson: async (id: string) =>
    authenticatedApi(`/api/growth/community/people/${id}/review`, { method: "POST" }),
  updateCommunityPerson: async (id: string, payload: Record<string, unknown>) =>
    authenticatedApi(`/api/growth/community/people/${id}`, {
      method: "PATCH", body: JSON.stringify(payload),
    }),
  changeCommunityStage: async (id: string, stage: string, reason?: string) =>
    authenticatedApi(`/api/growth/community/people/${id}/stage`, {
      method: "POST", body: JSON.stringify({ stage, reason }),
    }),
  createCommunityInteraction: async (id: string, payload: Record<string, unknown>) =>
    authenticatedApi(`/api/growth/community/people/${id}/interactions`, {
      method: "POST", body: JSON.stringify(payload),
    }),
  communityInteractions: async () =>
    (await authenticatedApi<{ status: "success"; interactions: GrowthRecord[] }>(
      "/api/growth/community/interactions",
    )).interactions,
  communityFollowUps: async () =>
    (await authenticatedApi<{ status: "success"; follow_ups: GrowthRecord[] }>(
      "/api/growth/community/follow-ups",
    )).follow_ups,
  createCommunityFollowUp: async (id: string, payload: Record<string, unknown>) =>
    authenticatedApi(`/api/growth/community/people/${id}/follow-ups`, {
      method: "POST", body: JSON.stringify(payload),
    }),
  updateCommunityFollowUp: async (id: string, payload: Record<string, unknown>) =>
    authenticatedApi(`/api/growth/community/follow-ups/${id}`, {
      method: "PATCH", body: JSON.stringify(payload),
    }),
  saveCommunityQualification: async (id: string, payload: Record<string, unknown>) =>
    authenticatedApi(`/api/growth/community/people/${id}/qualification`, {
      method: "POST", body: JSON.stringify(payload),
    }),
  communityDraft: async (id: string, kind: string) =>
    (await authenticatedApi<{ status: "success"; draft: string }>(
      `/api/growth/community/people/${id}/draft`,
      { method: "POST", body: JSON.stringify({ kind }) },
    )).draft,
  communityVoice: async () =>
    (await authenticatedApi<{ status: "success"; voice: GrowthRecord[] }>(
      "/api/growth/community/voice",
    )).voice,
  trackedLinks: async () =>
    (await authenticatedApi<{ status: "success"; tracked_links: GrowthRecord[] }>(
      "/api/growth/tracked-links",
    )).tracked_links,
  createTrackedLink: async (payload: Record<string, unknown>) =>
    (await authenticatedApi<{ status: "success"; tracked_link: GrowthRecord }>(
      "/api/growth/tracked-links",
      { method: "POST", body: JSON.stringify(payload) },
    )).tracked_link,
  tractionSummary: async () =>
    (await authenticatedApi<{ status: "success"; summary: GrowthRecord }>(
      "/api/growth/traction/summary",
    )).summary,
  handoffMedia: async () => (await authenticatedApi<{media:{id:string;display_name:string;filename:string}[]}>("/api/growth/social/handoff-media")).media,
  prepareSocialHandoff: async (job:SocialPublishJob) => (await authenticatedApi<{handoff:{url:string;expires_at:string;state:string;completion:string}}>(`/api/growth/social/publish-jobs/${job.id}/handoff`,{method:"POST",body:JSON.stringify({confirmed:true,expected_fingerprint:job.approval_fingerprint})})).handoff,
  socialPublishJobs: async () =>
    (await authenticatedApi<{publish_jobs: SocialPublishJob[]}>("/api/growth/social/publish-jobs")).publish_jobs,
  socialPublishJob: async (id: string) =>
    (await authenticatedApi<{publish_job: SocialPublishJob}>(`/api/growth/social/publish-jobs/${id}`)).publish_job,
  saveSocialVariant: async (contentId: string, provider: string, copy: string, destination: string, media: {publishing_asset_id:string}[] = []) =>
    (await authenticatedApi<{variant: {id: string}}>(`/api/growth/social/content/${contentId}/variants/${provider}`, {
      method:"PUT",body:JSON.stringify({copy,media_references:media,destination_reference:destination})
    })).variant,
  approveSocialVariant: async (id: string) =>
    authenticatedApi(`/api/growth/social/variants/${id}/approve`,{method:"POST",body:JSON.stringify({copy_approved:true,media_approved:true})}),
  createSocialPublishJob: async (connectionId: string, variantId: string) =>
    (await authenticatedApi<{publish_job:{id:string}}>("/api/growth/social/publish-jobs",{method:"POST",body:JSON.stringify({connection_id:connectionId,content_variant_id:variantId})})).publish_job,
  approveSocialPublishJob: async (job: SocialPublishJob) =>
    (await authenticatedApi<{publish_job:SocialPublishJob}>(`/api/growth/social/publish-jobs/${job.id}/approve`,{method:"POST",body:JSON.stringify({approved:true,expected_fingerprint:job.current_fingerprint})})).publish_job,
  publishSocialJob: async (job: SocialPublishJob) =>
    (await authenticatedApi<{publish_job:SocialPublishJob}>(`/api/growth/social/publish-jobs/${job.id}/publish`,{method:"POST",body:JSON.stringify({confirm_publish:true,expected_fingerprint:job.approval_fingerprint})})).publish_job,
  socialProviders: async () =>
    (await authenticatedApi<{ status: "success"; providers: SocialProviderOverview[] }>(
      "/api/growth/social/providers",
    )).providers,
  beginSocialOAuth: async (provider: string) =>
    (await authenticatedApi<{
      status: "success";
      oauth: { authorization_url: string; expires_in_seconds: number };
    }>(`/api/growth/social/oauth/${provider}/start`, { method: "POST" })).oauth,
  disconnectSocialProvider: async (provider: string) =>
    authenticatedApi(`/api/growth/social/connections/${provider}/disconnect`, {
      method: "POST",
    }),
};
