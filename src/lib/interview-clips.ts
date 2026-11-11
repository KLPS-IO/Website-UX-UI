export const interviewTopics = ['story', 'impact', 'alternative', 'gap', 'outcome', 'concepts', 'offer', 'reflection'] as const;
export function clipTopic(key: string): string { return key.split('__')[0]; }
export function newClipKey(topic: string): string { return `${topic}__${crypto.randomUUID()}`; }
