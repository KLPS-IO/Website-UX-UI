import type { Interview } from './customer-interviews';
import type { AudioTake } from '@/components/research/InterviewAudio';
export type PendingClip = { key: string; interview: Interview; take: AudioTake; savedAt: string };
const databaseName = 'klps-private-recording-recovery';
async function database(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore('clips', { keyPath: 'key' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function transaction<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await database();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction('clips', mode);
      const request = action(tx.objectStore('clips'));
      tx.oncomplete = () => resolve(request.result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || Error('Device backup failed.'));
    });
  } finally { db.close(); }
}
let writes: Promise<unknown> = Promise.resolve();
export function backUpClip(clip: PendingClip) {
  const operation = writes.catch(()=>{}).then(()=>transaction('readwrite', store => store.put(clip)));
  writes = operation; return operation;
}
export function removeClipBackup(key: string) {
  const operation = writes.catch(()=>{}).then(()=>transaction('readwrite', store => store.delete(key)));
  writes = operation; return operation;
}
export const recoverClips = () => transaction('readonly', store => store.getAll()) as Promise<PendingClip[]>;
