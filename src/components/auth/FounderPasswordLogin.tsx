import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { rdLabService } from "@/services/rd-lab/rd-lab.service";

type FounderPasswordLoginProps = {
  eyebrow: string;
  title: string;
  description: string;
  destination: string;
  returnTo: string;
  returnLabel: string;
  accent?: "magenta" | "purple";
};

export function FounderPasswordLogin({
  eyebrow,
  title,
  description,
  destination,
  returnTo,
  returnLabel,
  accent = "magenta",
}: FounderPasswordLoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const accentClass =
    accent === "purple"
      ? "bg-[#945c8c] focus:border-[#945c8c]"
      : "bg-[#df3fae] focus:border-[#df3fae]";

  return (
    <main className="rd-lab-light flex min-h-screen items-center justify-center bg-[#f7f4f8] px-5 text-[#251d29]">
      <div className="w-full max-w-md rounded-3xl border border-[#3a2a41]/15 bg-white p-7 shadow-[0_24px_70px_-35px_rgba(58,42,65,0.35)]">
        <div className="text-xs uppercase tracking-[.25em] text-[#b52a8b]">
          {eyebrow}
        </div>
        <h1 className="mt-4 text-3xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-[#756a7a]">{description}</p>
        <form
          className="mt-8 space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            setBusy(true);
            setError("");
            try {
              await rdLabService.login(email, password, remember);
              navigate(destination, { replace: true });
            } catch {
              setError("Invalid email or password");
            } finally {
              setBusy(false);
            }
          }}
        >
          <label className="block text-sm text-[#574b5d]">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#3a2a41]/15 bg-white px-4 py-3 text-[#251d29] outline-none focus:border-[#df3fae]"
            />
          </label>
          <label className="block text-sm text-[#574b5d]">
            Password
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#3a2a41]/15 bg-white px-4 py-3 text-[#251d29] outline-none focus:border-[#df3fae]"
            />
          </label>
          <label className="flex items-center gap-3 text-sm text-[#756a7a]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            Remember this device
          </label>
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-400/25 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <button
            disabled={busy}
            className={`w-full rounded-xl px-4 py-3 font-semibold text-white disabled:opacity-60 ${accentClass}`}
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <Link
          to={returnTo}
          className="mt-6 block text-center text-sm text-[#756a7a] hover:text-[#251d29]"
        >
          {returnLabel}
        </Link>
      </div>
    </main>
  );
}
