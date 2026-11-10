// Campaign context only. Public links never contain an interview ID or personal data.
export function discoverySource(search: string): string {
  const value = new URLSearchParams(search).get('discovery') || '';
  return /^[a-z0-9-]{1,48}$/.test(value) ? value : '';
}
export function discoveryPath(path: string, source: string): string {
  return `${path}?${new URLSearchParams({ discovery: source })}`;
}
