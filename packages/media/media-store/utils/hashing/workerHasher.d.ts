import { Hasher } from './hasher';
export interface Deferred {
    resolve: (hash: string) => void;
    reject: (error: any) => void;
}
export declare class WorkerHasher implements Hasher {
    private workers;
    private jobs;
    constructor(numOfWorkers: number);
    hash(chunk: Blob): Promise<string>;
    private createWorker;
    private handleWorkerMessage;
    private calculateHashInWorker;
    private dispatch;
    private getMostRelaxedWorker;
}
