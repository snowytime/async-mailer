import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";

import { EmailError, Mail } from "./types.js";
import { verify } from "./verify/index.js";
import { env, generateId } from "./helpers/index.js";
import { send } from "./sender/index.js";

export * from "./builder/index.js";
export * from "./injector/index.js";
export * from "./sender/index.js";
export * from "./verify/index.js";
export * from "./helpers/index.js";
export * from "./types.js";

type SendArgs = Mail | ((transactionId: string) => Promise<Mail>);

export const snowmailerCtor = (transporter: Transporter<SentMessageInfo>) => {
    return async function snowmailer(args: SendArgs) {
        try {
            await verify(transporter);
            const transactionId = generateId();
            if (typeof args === "function") {
                const options = await args(transactionId);
                if ((!options.html && !options.text) || !options.to || !options.subject) {
                    throw new EmailError({
                        message: "Email is missing either html or text, or to or subject",
                    });
                }
                await send({ transporter, options });
                return transactionId;
            }
            if ((!args.html && !args.text) || !args.to || !args.subject) {
                throw new EmailError({
                    message: "Email is missing either html or text, or to or subject",
                });
            }
            await send({ transporter, options: args });
            return transactionId;
        } catch (e) {
            if (e instanceof Error) {
                throw new EmailError(e);
            }
            throw e;
        }
    };
};

const transporter = nodemailer.createTransport({
    service: env.EMAIL_PROVIDER,
    auth: {
        user: env.EMAIL_USERNAME,
        pass: env.EMAIL_PASSWORD,
    },
});
export const snowmailer = snowmailerCtor(transporter);
