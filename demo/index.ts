import { createMailer } from "../dist/index.js";
import env from "./env.js";
import { join } from "node:path";

const handler = async () => {
	// this can be done wherever
	const mailer = createMailer({
		provider: "gmail",
		username: env.EMAIL_USERNAME,
		password: env.EMAIL_PASSWORD
	});
	await mailer({
		subject: "hello",
		to: "snaer@ualberta.ca",
		html: "HI THERE"
		// attachments: [
		// 	{
		// 		path: join(process.cwd(), "demo/att.pdf")
		// 	}
		// ]
	});
	console.log("sent");
};

handler();
