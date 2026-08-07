import { S3Client } from "bun";

export class Recovery {
    private client: S3Client;
    private prefix: string;

    constructor(prefix: string,accessKeyId: string,secretAccessKey: string,bucket: string,region: string, endpoint: string) {
        this.client = new S3Client({
            accessKeyId,
            secretAccessKey,
            bucket,
            endpoint
        });
        this.prefix = prefix;
    }

    async captureSnapshot(backupIntervalMs: number) {
        
    }

    async restoreEventsFromStream() {

    }

    async restoreFromLatestSnapshot() {

    }
}

