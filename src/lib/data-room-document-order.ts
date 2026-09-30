export type VersionedDataRoomDocument = {
  filename: string;
  version?: string;
  updatedAt?: string;
  updated_at?: string;
};

const versionParts = (document: VersionedDataRoomDocument) => {
  const source = `${document.version ?? ""} ${document.filename}`;
  const match = source.match(/(?:^|[\s_(-])v(?:ersion\s*)?(\d+(?:\.\d+)*)/i)
    ?? source.match(/(?:^|[\s_(-])(\d+(?:\.\d+)+)(?:[\s_).,-]|$)/);
  return (match?.[1] ?? "0").split(".").map((part) => Number(part) || 0);
};

const compareVersionParts = (left: number[], right: number[]) => {
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    const difference = (right[index] ?? 0) - (left[index] ?? 0);
    if (difference) return difference;
  }
  return 0;
};

export const newestVersionFirst = <T extends VersionedDataRoomDocument>(
  documents: T[],
) => [...documents].sort((left, right) => {
  const versionDifference = compareVersionParts(versionParts(left), versionParts(right));
  if (versionDifference) return versionDifference;

  const leftDate = Date.parse(left.updatedAt ?? left.updated_at ?? "") || 0;
  const rightDate = Date.parse(right.updatedAt ?? right.updated_at ?? "") || 0;
  if (leftDate !== rightDate) return rightDate - leftDate;

  return left.filename.localeCompare(right.filename);
});
