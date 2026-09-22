import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "@/lib/authenticated-api";
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
  const [showPassword, setShowPassword] = useState(false);
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
            if (busy) return;
            setBusy(true);
            setError("");
            try {
              await rdLabService.login(email.trim().toLowerCase(), password, remember);
              navigate(destination, { replace: true });
            } catch (err) {
              setError(
                err instanceof ApiError && err.status === 401
                  ? "The email or password was not accepted. Check your email and use Show password to check what you entered."
                  : err instanceof ApiError && err.status === 429
                    ? "Too many sign-in attempts. Please wait a few minutes before trying again."
                    : "Unable to connect to the sign-in service. Please try again shortly.",
              );
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
              type={showPassword ? "text" : "password"}
              id="founder-password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#3a2a41]/15 bg-white px-4 py-3 text-[#251d29] outline-none focus:border-[#df3fae]"
            />
          </label>
          <button
            type="button"
            aria-controls="founder-password"
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
            className="min-h-11 rounded-lg px-2 text-sm font-medium text-[#574b5d] underline focus-visible:outline focus-visible:outline-2"
          >
            {showPassword ? "Hide password" : "Show password"}
          </button>
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
