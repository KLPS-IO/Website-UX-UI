import { Navigate } from "react-router-dom";

import { isFounderUser } from "@/lib/access";

type Props = {
  children: React.ReactNode;
};

export default function FounderRoute({
  children
}: Props) {
  if (!isFounderUser()) {
    return (
      <Navigate
        to="/beta-dashboard"
        replace
      />
    );
  }

  return <>{children}</>;
}
