export type Config = {
    username: string;
    password: string;
    provider: string;
};
export type Attachment = {
    path?: string;
    filename?: string;
    content?: Buffer | string;
    contentType?: string;
    encoding?: string;
    raw?: string;
};
export interface Mail {
    // from: string;
    to: string;
    subject: string;
    html?: string;
    text?: string;
    transactionId?: string;
    attachments?: Attachment[];
}
interface EmailErrorConstructor {
    message: string;
    status?: number;
}
export class EmailError extends Error {
    message: string;

    status!: number;

    type!: string;

    constructor(data: EmailErrorConstructor) {
        super(data.message);
        this.message = data.message;
    }
}
