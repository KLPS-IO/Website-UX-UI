export function xPublishingEnabled(provider: {provider: string; publishing_enabled?: boolean; connection?: {status: string; granted_scopes?: string[]} | null}) {
  return provider.provider === 'x' && provider.publishing_enabled === true && provider.connection?.status === 'connected'
    && ['tweet.read','users.read','tweet.write'].every(scope => provider.connection?.granted_scopes?.includes(scope));
}
export function canPublishJob(job: {status: string; execution_state: string; approval_fingerprint: string | null; current_fingerprint: string; retry_after: string | null; needs_review: boolean}) {
  return ['approved','retry'].includes(job.status) && !job.needs_review && ['not_started','rejected'].includes(job.execution_state)
    && Boolean(job.approval_fingerprint) && job.approval_fingerprint === job.current_fingerprint
    && (!job.retry_after || Date.parse(job.retry_after) <= Date.now());
}
