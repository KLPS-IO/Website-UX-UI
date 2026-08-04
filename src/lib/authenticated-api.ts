import { API_BASE } from "@/config/api";

const TOKEN_KEYS = ["klps.dataRoom.sessionToken", "klps.founderDashboard.sessionToken"];

export class ApiError extends Error {
  constructor(message: string, public readonly status: number, public readonly code?: string, public readonly payload?: Record<string, unknown>) {
    super(message);
    this.name = "ApiError";
  }
}

export async function authenticatedApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = TOKEN_KEYS.map((key) => sessionStorage.getItem(key)).find(Boolean);
  const multipart = options.body instanceof FormData;
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(!multipart ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const text = await response.text();
  let body: unknown = {};
  try { body = text ? JSON.parse(text) : {}; } catch { body = {}; }
  if (!response.ok) {
    const record = body && typeof body === "object" ? body as Record<string, unknown> : {};
    throw new ApiError(String(record.message ?? record.error ?? `Request failed with ${response.status}`), response.status, typeof record.code === "string" ? record.code : undefined, record);
  }
  return body as T;
}

export async function authenticatedBlob(path: string): Promise<Blob> {
  const token = TOKEN_KEYS.map((key) => sessionStorage.getItem(key)).find(Boolean);
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) {
    let body: Record<string, unknown> = {};
    try { body = await response.json() as Record<string, unknown>; } catch { /* Non-JSON storage error. */ }
    throw new ApiError(
      String(body.message ?? body.error ?? `Request failed with ${response.status}`),
      response.status,
      typeof body.code === "string" ? body.code : undefined,
      body,
    );
  }
  return response.blob();
}

export async function authenticatedBlobRequest(path:string,options:RequestInit={}):Promise<Blob>{
  const token=TOKEN_KEYS.map(key=>sessionStorage.getItem(key)).find(Boolean);
  const response=await fetch(`${API_BASE}${path}`,{...options,credentials:"include",headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{ }),...options.headers}});
  if(!response.ok){let body:Record<string,unknown>={};try{body=await response.json() as Record<string,unknown>;}catch{/* CSV endpoint may return a non-JSON proxy error. */}throw new ApiError(String(body.message??body.error??`Request failed with ${response.status}`),response.status,typeof body.code==="string"?body.code:undefined,body);}
  return response.blob();
}
