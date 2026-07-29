import { authenticatedApi } from "@/lib/authenticated-api";
import type {
  CommunityPeopleResponse,
  CommunityPerson,
  CommunitySummary,
  GrowthMission,
  GrowthRecord,
  GrowthResource,
  GrowthStrategy,
  MissionControl,
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
};
