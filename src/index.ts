// @ts-ignore
import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import type { Config, Mail } from "types.js";

import { luhn } from "@snowytime/fns";

const verify = async (transporter: Transporter<SentMessageInfo>) =>
	new Promise((resolve, reject) => {
		transporter.verify(function (error, success) {
			if (error) {
				// theres an error
				reject(error);
			} else {
				// server is ready
				resolve(success);
			}
		});
	});
const send = async ({
	transporter,
	options
}: {
	transporter: Transporter<SentMessageInfo>;
	options: Mail;
}) =>
	new Promise((resolve, reject) => {
		if (!options.html && !options.text) {
			reject("Missing content -- needs either text or html property");
		}
		transporter.sendMail(options, (err, info) => {
			if (err) {
				reject(err);
			} else {
				resolve(info);
			}
		});
	});
const mailer_factory =
	({ provider, username, password }: Config) =>
	async (options: Mail) => {
		// prepare the transporter
		const transporter = nodemailer.createTransport({
			service: provider,
			auth: {
				user: username,
				pass: password
			}
		});
		try {
			await verify(transporter);
			await send({ transporter, options });
		} catch (e: any) {
			throw new Error(e);
		}
	};
export const createMailer = (initializers: Config) => {
	return mailer_factory(initializers);
};

console.log(luhn("4242424242424242"));
// console.log(nanoid());
