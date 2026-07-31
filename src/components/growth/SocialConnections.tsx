import { AlertCircle, Check, ChevronDown, ChevronUp, Link2, RefreshCw, ShieldCheck, Unplug } from "lucide-react";
import { useEffect, useState } from "react";
import { growthService } from "@/services/growth/growth.service";
import type { SocialProviderOverview } from "@/types/growth";
import {
  processLinkedInOAuthReturn,
  type LinkedInOAuthReturn,
} from "@/lib/growth-social-oauth-return";

const dateTime = (value: string | null | undefined) => {
  if (!value || Number.isNaN(Date.parse(value))) return "Not yet checked";
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
};

export function SocialConnections({ allowedProviders }: { allowedProviders?: string[] }) {
  const [providers,setProviders] = useState<SocialProviderOverview[]>([]);
  const [expanded,setExpanded] = useState<string | null>(null);
  const [working,setWorking] = useState<string | null>(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [notice,setNotice] = useState("");
  const [oauthResult,setOauthResult] = useState<LinkedInOAuthReturn | null>(null);

  const load = async () => {
    setLoading(true); setError("");
    try { setProviders(await growthService.socialProviders()); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Connections could not be loaded."); }
    finally { setLoading(false); }
  };
  useEffect(() => {
    void processLinkedInOAuthReturn(
      window.location.href,
      load,
      (url) => window.history.replaceState(window.history.state, "", url),
    ).then(setOauthResult);
  }, []);

  const connect = async (provider: SocialProviderOverview) => {
    setWorking(provider.provider); setError(""); setNotice("");
    try {
      if (!provider.availability.available) {
        setExpanded(provider.provider);
        setNotice(`${provider.name} needs developer setup before it can connect.`);
        return;
      }
      const oauth = await growthService.beginSocialOAuth(provider.provider);
      window.location.assign(oauth.authorization_url);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : `${provider.name} could not begin connecting.`);
      setExpanded(provider.provider);
    } finally { setWorking(null); }
  };

  const disconnect = async (provider: SocialProviderOverview) => {
    if (!window.confirm(`Disconnect ${provider.name}? Its encrypted identity token will be removed.`)) return;
    setWorking(provider.provider); setError("");
    try {
      await growthService.disconnectSocialProvider(provider.provider);
      setNotice(`${provider.name} disconnected. Stored tokens were removed.`);
      await load();
    } catch (reason) { setError(reason instanceof Error ? reason.message : `${provider.name} could not be disconnected.`); }
    finally { setWorking(null); }
  };

  const visibleProviders = allowedProviders
    ? providers.filter((provider) => allowedProviders.includes(provider.provider))
    : providers;

  return <section className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="text-xs font-bold uppercase tracking-[.1em] text-[#35d3c8]">Official APIs only</div><h2 className="mt-2 text-lg font-bold text-white">Connections</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-white/60">Connect identities progressively using secure OAuth. Tokens stay encrypted on the backend. Publishing, messaging, advertising and content management are not enabled.</p></div><ShieldCheck className="h-6 w-6 shrink-0 text-[#35d3c8]" /></div>
    {oauthResult && <div role={oauthResult.tone === "error" ? "alert" : "status"} className={`mt-4 rounded-xl border p-3 text-sm font-semibold ${oauthResult.tone === "error" ? "border-amber-300/25 bg-amber-300/10 text-amber-100" : "border-[#087f7a]/25 bg-[#d9f1ef] text-[#075e5a]"}`}>{oauthResult.message}</div>}
    {error && <div role="alert" className="mt-4 rounded-xl border border-red-400/25 bg-red-500/10 p-3 text-sm text-red-100">{error} <button type="button" onClick={() => void load()} className="ml-2 underline">Retry</button></div>}
    {notice && <div role="status" className="mt-4 rounded-xl border border-[#087f7a]/25 bg-[#d9f1ef] p-3 text-sm font-semibold text-[#075e5a]">{notice}</div>}
    {loading ? <p className="mt-5 text-sm text-white/55">Checking platform availability…</p> : <div className="mt-5 space-y-3">{visibleProviders.map(provider => {
      const connection = provider.connection;
      const connected = connection?.status === "connected";
      const linkedInMemberConnected = provider.provider === "linkedin" && connected && connection.provider_account_type === "member";
      const metaIdentityConnected = provider.provider === "facebook" && connected && connection.provider_account_type === "member";
      const open = expanded === provider.provider;
      return <article key={provider.provider} className="overflow-hidden rounded-xl border border-white/10 bg-black/10">
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${connected ? "bg-[#35d3c8]/15 text-[#35d3c8]" : "bg-white/[.06] text-white/55"}`}>{connected ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />}</div>
          <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-white">{provider.name}</h3><span className={`rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.02em] ${connected ? "border-[#087f7a]/20 bg-[#35d3c8]/15 text-[#087f7a]" : provider.availability.available ? "border-[#a91876]/20 bg-[#df3fae]/15 text-[#a91876]" : "border-[#9a7412]/25 bg-[#f3e4a7] text-[#654b08]"}`}>{linkedInMemberConnected || metaIdentityConnected ? "Identity connected" : connection?.status ? connection.status.replaceAll("_"," ") : provider.availability.available ? "Ready to connect" : "Setup required"}</span></div><p className="mt-1 text-sm text-white/50">{connection?.provider_account_name ?? provider.availability.reason}</p>{linkedInMemberConnected && <p className="mt-1 text-sm font-semibold text-[#075e5a]">LinkedIn member identity only. Publishing is not enabled.</p>}{metaIdentityConnected && <p className="mt-1 text-sm font-semibold text-[#075e5a]">Meta member identity with Facebook Page and linked Instagram professional discovery only. Publishing is not enabled.</p>}<p className="mt-1 text-xs text-white/35">Last healthy check: {dateTime(connection?.last_successful_check_at)}</p></div>
          <div className="flex flex-wrap gap-2">{connected ? <><button type="button" disabled={working === provider.provider} onClick={() => void connect(provider)} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold text-white"><RefreshCw className="h-4 w-4" />Reconnect</button><button type="button" disabled={working === provider.provider} onClick={() => void disconnect(provider)} className="inline-flex items-center gap-2 rounded-xl border border-[#c73b3b]/35 bg-[#fff1f1] px-3 py-2 text-sm font-semibold text-[#a51f1f] transition hover:border-[#a51f1f]/55 hover:bg-[#ffe5e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c73b3b]/25"><Unplug className="h-4 w-4" />Disconnect</button></> : <button type="button" disabled={working === provider.provider} onClick={() => void connect(provider)} className="rounded-xl bg-[#df3fae] px-4 py-2 text-sm font-bold text-white disabled:opacity-50">{working === provider.provider ? "Checking…" : "Connect"}</button>}<button type="button" onClick={() => setExpanded(open ? null : provider.provider)} aria-expanded={open} aria-controls={`social-setup-${provider.provider}`} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold text-white">{open ? "Hide details" : "View details"}{open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button></div>
        </div>
        {open && <div id={`social-setup-${provider.provider}`} className="border-t border-white/10 p-4"><div className="grid gap-5 lg:grid-cols-2"><div><h4 className="text-sm font-bold text-white">Capabilities</h4><div className="mt-2 flex flex-wrap gap-2">{provider.capabilities.map(item => <span key={item} className="rounded-full bg-white/[.06] px-2.5 py-1 text-xs text-white/65">{item.replaceAll("_"," ")}</span>)}</div><h4 className="mt-5 text-sm font-bold text-white">Required permissions</h4><div className="mt-2 flex flex-wrap gap-2">{provider.required_permissions.length ? provider.required_permissions.map(item => <code key={item} className="rounded bg-black/25 px-2 py-1 text-xs text-white/60">{item}</code>) : <span className="text-sm text-white/45">Defined when this future provider is activated.</span>}</div></div><div><h4 className="text-sm font-bold text-white">Developer setup checklist</h4><ul className="mt-2 space-y-2">{provider.setup_checklist.map((item,index) => <li key={`${item.label}-${index}`} className="flex gap-2 rounded-lg bg-white/[.035] p-3"><span className="mt-0.5">{item.status === "configured" ? <Check className="h-4 w-4 text-[#35d3c8]" /> : <AlertCircle className="h-4 w-4 text-amber-300" />}</span><div><div className="text-sm font-semibold text-white">{item.label}</div><p className="mt-1 text-xs leading-5 text-white/50">{item.detail}</p><span className="mt-1 block text-[10px] font-bold uppercase tracking-[.06em] text-white/35">{item.status.replaceAll("_"," ")}</span></div></li>)}</ul>{provider.availability.missing_environment.length > 0 && <div className="mt-4 rounded-xl border border-[#9a7412]/30 bg-[#f8efd3] p-4"><div className="text-sm font-bold uppercase tracking-[0.03em] text-[#654b08]">Backend variables still needed</div><div className="mt-3 flex flex-wrap gap-2">{provider.availability.missing_environment.map(name => <code key={name} className="rounded-lg border border-[#9a7412]/20 bg-white px-2.5 py-1.5 text-sm font-semibold text-[#4c3908]">{name}</code>)}</div></div>}</div></div></div>}
      </article>;
    })}</div>}
  </section>;
}
