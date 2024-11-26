import { MentionNameDetails, MentionNameStatus } from '../types';
import { MentionNameClient } from './MentionNameClient';

interface Callback {
  (value?: MentionNameDetails): void;
}

export interface MentionNameResolver {
  lookupName(id: string): Promise<MentionNameDetails> | MentionNameDetails;
  cacheName(id: string, name: string): void;
}

export class DefaultMentionNameResolver implements MentionNameResolver {
  public static waitForBatch = 100; // ms

  private client: MentionNameClient;

  private nameCache: Map<string, MentionNameDetails> = new Map();

  private nameQueue: Map<string, Callback[]> = new Map();

  private nameStartTime: Map<string, number> = new Map();

  private processingQueue: Map<string, Callback[]> = new Map();

  private debounce: number = 0;

  private fireHydrationEvent: (
    action: string,
    userId: string,
    fromCache: boolean,
    duration: number,
  ) => void;

  constructor(client: MentionNameClient) {
    this.client = client;
  }

  lookupName(id: string): Promise<MentionNameDetails> | MentionNameDetails {
    const name = this.nameCache.get(id);
    if (name) {
      return name;
    }

    // eslint-disable-next-line compat/compat
    return new Promise((resolve) => {
      const processingItems = this.processingQueue.get(id);
      if (processingItems) {
        this.processingQueue.set(id, [...processingItems, resolve]);
      }

      const queuedItems = this.nameQueue.get(id) || [];
      this.nameQueue.set(id, [...queuedItems, resolve]);

      if (queuedItems.length === 0 && !processingItems) {
        this.nameStartTime.set(id, Date.now());
      }

      this.scheduleProcessQueue();

      if (this.isQueueAtLimit()) {
        this.processQueue();
      }
    });
  }

  cacheName(id: string, name: string) {
    this.nameCache.set(id, {
      id,
      name,
      status: MentionNameStatus.OK,
    });
  }

  private scheduleProcessQueue() {
    if (!this.debounce) {
      this.debounce = window.setTimeout(
        this.processQueue,
        DefaultMentionNameResolver.waitForBatch,
      );
    }
  }

  private isQueueAtLimit() {
    return this.nameQueue.size >= this.client.getLookupLimit();
  }

  private splitQueueAtLimit() {
    const values = Array.from(this.nameQueue.entries());
    const splitPoint = this.client.getLookupLimit();

    return {
      queue: new Map(values.slice(0, splitPoint)),
      extraQueue: new Map(values.slice(splitPoint)),
    };
  }

  private resolveQueueItem(mentionDetail: MentionNameDetails) {
    const { id } = mentionDetail;
    const resolvers = this.processingQueue.get(id);
    if (resolvers) {
      this.processingQueue.delete(id);
      this.nameCache.set(id, mentionDetail);
      resolvers.forEach((resolve) => {
        try {
          resolve(mentionDetail);
        } catch {
          // ignore - exception in consumer
        }
      });
    }
  }

  private processQueue = () => {
    clearTimeout(this.debounce);
    this.debounce = 0;

    const { queue, extraQueue } = this.splitQueueAtLimit();
    this.nameQueue = extraQueue;
    this.processingQueue = new Map([...this.processingQueue, ...queue]);
    this.client
      .lookupMentionNames(Array.from(queue.keys()))
      .then((response) => {
        response.forEach((mentionDetail) => {
          const { id } = mentionDetail;
          queue.delete(id);
          this.resolveQueueItem(mentionDetail);
        });
        queue.forEach((_callback, id) => {
          // No response from client for these ids treat as unknown
          this.resolveQueueItem({
            id,
            status: MentionNameStatus.UNKNOWN,
          });
        });
      })
      .catch(() => {
        // Service completely failed, reject all items in the queue
        queue.forEach((_callback, id) => {
          this.resolveQueueItem({
            id,
            status: MentionNameStatus.SERVICE_ERROR,
          });
        });
      });

    // Make sure anything left in the queue gets processed.
    if (this.nameQueue.size > 0) {
      this.scheduleProcessQueue();
    }
  };
}
