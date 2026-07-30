export const LINKEDIN_OAUTH_ERROR_MESSAGES = {
  access_denied:
    "LinkedIn connection was cancelled. Any existing healthy connection is unchanged.",
  invalid_state:
    "This LinkedIn connection request is invalid or has already been used. Start a new connection from Growth OS.",
  expired_state:
    "This LinkedIn connection request expired. Start a new connection from Growth OS.",
  missing_code:
    "LinkedIn did not return the information needed to complete the connection. Please try again.",
  provider_exchange_failed:
    "LinkedIn could not complete the secure connection. Please try again.",
  identity_lookup_failed:
    "LinkedIn connected, but the member identity could not be confirmed. Your existing connection is unchanged.",
  connection_failed:
    "The LinkedIn connection could not be completed. Your existing healthy connection, if any, is unchanged.",
} as const;

export type LinkedInOAuthErrorCode =
  keyof typeof LINKEDIN_OAUTH_ERROR_MESSAGES;

export type LinkedInOAuthReturn =
  | {
      provider: "linkedin";
      status: "connected";
      tone: "success";
      message: string;
    }
  | {
      provider: "linkedin";
      status: "failed";
      tone: "error";
      errorCode: LinkedInOAuthErrorCode;
      message: string;
    };

const OAUTH_RESULT_PARAMETERS = [
  "social_provider",
  "social_status",
  "social_error",
] as const;

const isLinkedInErrorCode = (
  value: string | null,
): value is LinkedInOAuthErrorCode =>
  Boolean(value && value in LINKEDIN_OAUTH_ERROR_MESSAGES);

export const readLinkedInOAuthReturn = (
  search: string,
): LinkedInOAuthReturn | null => {
  const parameters = new URLSearchParams(search);
  if (parameters.get("social_provider") !== "linkedin") return null;

  const status = parameters.get("social_status");
  if (status === "connected") {
    return {
      provider: "linkedin",
      status,
      tone: "success",
      message:
        "LinkedIn member identity connected. Publishing is not enabled.",
    };
  }

  const errorCode = parameters.get("social_error");
  if (status !== "failed" || !isLinkedInErrorCode(errorCode)) return null;
  return {
    provider: "linkedin",
    status,
    tone: "error",
    errorCode,
    message: LINKEDIN_OAUTH_ERROR_MESSAGES[errorCode],
  };
};

export const removeSocialOAuthResultParameters = (href: string) => {
  const url = new URL(href);
  for (const parameter of OAUTH_RESULT_PARAMETERS) {
    url.searchParams.delete(parameter);
  }
  return `${url.pathname}${url.search}${url.hash}`;
};

export const processLinkedInOAuthReturn = async (
  href: string,
  refreshConnections: () => Promise<void>,
  replaceHistory: (url: string) => void,
) => {
  const url = new URL(href);
  const hasOAuthParameters = OAUTH_RESULT_PARAMETERS.some((parameter) =>
    url.searchParams.has(parameter),
  );
  const result = readLinkedInOAuthReturn(url.search);

  if (hasOAuthParameters) {
    replaceHistory(removeSocialOAuthResultParameters(href));
  }

  await refreshConnections();
  return result;
};
