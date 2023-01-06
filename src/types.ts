export type Config = {
	username: string;
	password: string;
	provider: string;
};
export type Attachment = {
	path?: string;
	filename?: string;
	content?: string;
	contentType?: string;
	encoding?: string;
	raw?: string;
};
export type Mail = {
	from: string;
	to: string;
	subject: string;
	html?: string;
	text?: string;
	attachments?: Attachment[];
};
