export const LINKEDIN_OAUTH_ERROR_MESSAGES = {
  access_denied:
    "LinkedIn connection was cancelled. Any existing healthy connection is unchanged.",
  invalid_state:
    "This LinkedIn connection request is invalid or has already been used. Start a new connection from Funnel OS.",
  expired_state:
    "This LinkedIn connection request expired. Start a new connection from Funnel OS.",
  missing_code:
    "LinkedIn did not return the information needed to complete the connection. Please try again.",
  provider_exchange_failed:
    "LinkedIn could not complete the secure connection. Please try again.",
  identity_lookup_failed:
    "LinkedIn connected, but the member identity could not be confirmed. Your existing connection is unchanged.",
  connection_failed:
    "The LinkedIn connection could not be completed. Your existing healthy connection, if any, is unchanged.",
} as const;

const META_OAUTH_ERROR_MESSAGES = {
  access_denied:
    "Meta connection was cancelled. Any existing healthy connection is unchanged.",
  invalid_state:
    "This Meta connection request is invalid or has already been used. Start a new connection from Funnel OS.",
  expired_state:
    "This Meta connection request expired. Start a new connection from Funnel OS.",
  missing_code:
    "Meta did not return the information needed to complete the connection. Please try again.",
  provider_exchange_failed:
    "Meta could not complete the secure connection. Please try again.",
  identity_lookup_failed:
    "Meta connected, but the member or linked business identities could not be confirmed.",
  permission_lookup_failed:
    "Meta connected, but the granted identity permissions could not be confirmed.",
  connection_failed:
    "The Meta identity connection could not be completed. Any existing healthy connection is unchanged.",
} as const;

const TIKTOK_OAUTH_ERROR_MESSAGES = {
  access_denied:
    "TikTok connection was cancelled. Any existing healthy connection is unchanged.",
  invalid_state:
    "This TikTok connection request is invalid or has already been used. Start a new connection from Funnel OS.",
  expired_state:
    "This TikTok connection request expired. Start a new connection from Funnel OS.",
  missing_code:
    "TikTok did not return the information needed to complete the connection. Please try again.",
  provider_exchange_failed:
    "TikTok could not complete the secure connection. Please try again.",
  identity_lookup_failed:
    "TikTok connected, but the account identity could not be confirmed. Your existing connection is unchanged.",
  connection_failed:
    "The TikTok identity connection could not be completed. Any existing healthy connection is unchanged.",
} as const;

const X_OAUTH_ERROR_MESSAGES = {
  access_denied:
    "X connection was cancelled. Any existing healthy connection is unchanged.",
  invalid_state:
    "This X connection request is invalid or has already been used. Start a new connection from Funnel OS.",
  expired_state:
    "This X connection request expired. Start a new connection from Funnel OS.",
  missing_code:
    "X did not return the information needed to complete the connection. Please try again.",
  provider_exchange_failed:
    "X could not complete the secure connection. Please try again.",
  identity_lookup_failed:
    "X connected, but the account identity could not be confirmed. Your existing connection is unchanged.",
  connection_failed:
    "The X identity connection could not be completed. Any existing healthy connection is unchanged.",
} as const;

export type LinkedInOAuthErrorCode =
  keyof typeof LINKEDIN_OAUTH_ERROR_MESSAGES;
type MetaOAuthErrorCode = keyof typeof META_OAUTH_ERROR_MESSAGES;
type SocialOAuthErrorCode = LinkedInOAuthErrorCode | MetaOAuthErrorCode;

type SocialOAuthProvider = "linkedin" | "facebook" | "tiktok" | "x";

type CanonicalSocialProvider = {
  provider: string;
  connection: { status: string } | null;
};

export type LinkedInOAuthReturn =
  | {
      provider: SocialOAuthProvider;
      status: "connected";
      tone: "success";
      message: string;
    }
  | {
      provider: SocialOAuthProvider;
      status: "failed";
      tone: "error";
      errorCode: SocialOAuthErrorCode;
      message: string;
    };

const OAUTH_RESULT_PARAMETERS = [
  "social_provider",
  "social_status",
  "social_error",
] as const;

const isOAuthErrorCode = (
  value: string | null,
): value is SocialOAuthErrorCode =>
  Boolean(value && (
    value in LINKEDIN_OAUTH_ERROR_MESSAGES ||
    value in META_OAUTH_ERROR_MESSAGES ||
    value in TIKTOK_OAUTH_ERROR_MESSAGES ||
    value in X_OAUTH_ERROR_MESSAGES
  ));

export const readLinkedInOAuthReturn = (
  search: string,
): LinkedInOAuthReturn | null => {
  const parameters = new URLSearchParams(search);
  const provider = parameters.get("social_provider");
  if (!["linkedin","facebook","tiktok","x"].includes(provider ?? "")) return null;

  const status = parameters.get("social_status");
  if (status === "connected") {
    return {
      provider:provider as SocialOAuthProvider,
      status,
      tone: "success",
      message: provider === "linkedin"
        ? "LinkedIn member identity connected. Publishing is not enabled."
        : provider === "facebook"
          ? "Meta identity connected. Facebook Page and linked Instagram professional discovery are available. Publishing is not enabled."
          : provider === "tiktok" ? "TikTok identity connected" : "X identity connected",
    };
  }

  const errorCode = parameters.get("social_error");
  const messages = provider === "linkedin"
    ? LINKEDIN_OAUTH_ERROR_MESSAGES
    : provider === "facebook" ? META_OAUTH_ERROR_MESSAGES
      : provider === "tiktok" ? TIKTOK_OAUTH_ERROR_MESSAGES : X_OAUTH_ERROR_MESSAGES;
  if (status !== "failed" || !isOAuthErrorCode(errorCode) || !(errorCode in messages)) return null;
  return {
    provider:provider as SocialOAuthProvider,
    status,
    tone: "error",
    errorCode,
    message: messages[errorCode as keyof typeof messages],
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
  refreshConnections: () => Promise<readonly CanonicalSocialProvider[]>,
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

  const providers=await refreshConnections();
  if (
    (result?.provider === "facebook" || result?.provider === "tiktok" || result?.provider === "x") &&
    result.status === "connected" &&
    !providers.some(provider =>
      provider.provider === result.provider && provider.connection?.status === "connected"
    )
  ) return null;
  return result;
};
