import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authenticatedApi } from "@/lib/authenticated-api";

type SessionResponse = {
  authenticated?: boolean;
  user?: {
    role?: string;
    is_admin?: boolean;
    isAdmin?: boolean;
  } | null;
};

export default function TextileLabAuthGate({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [state, setState] = useState<"checking" | "authorised" | "unauthorised">("checking");

  useEffect(() => {
    let active = true;

    authenticatedApi<SessionResponse>("/api/data-room/session")
      .then((session) => {
        if (!active) return;
        const user = session.user;
        const founderAdmin =
          user?.role === "founder_admin" || user?.is_admin === true || user?.isAdmin === true;
        setState(session.authenticated === true && founderAdmin ? "authorised" : "unauthorised");
      })
      .catch(() => {
        if (active) setState("unauthorised");
      });

    return () => {
      active = false;
    };
  }, []);

  if (state === "checking") {
    return <main className="mx-auto max-w-6xl p-4 md:p-8">Checking secure founder session…</main>;
  }

  if (state === "unauthorised") {
    const returnTo = `${location.pathname}${location.search}${location.hash}`;
    return (
      <main className="mx-auto max-w-2xl p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Founder authentication required</CardTitle>
            <CardDescription>
              Your Beta session is active, but Textile Intelligence Lab engineering data also requires the secure founder-admin Data Room session.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to={`/data-room?returnTo=${encodeURIComponent(returnTo)}`}>Authenticate secure founder session</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return <>{children}</>;
}
