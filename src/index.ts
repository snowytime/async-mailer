import nodemailer from "nodemailer";

import { EmailError, Mail } from "./types.js";
import { verify } from "./verify/index.js";
import { generateId } from "./helpers/index.js";
import { send } from "./sender/index.js";

export * from "./sender/index.js";
export * from "./verify/index.js";
export * from "./helpers/index.js";
export * from "./types.js";

type SendArgs = Mail | ((transactionId: string) => Promise<Mail>);

type TransportArguments = {
    service: string;
    auth: {
        user: string;
        pass: string;
    };
};

export const snowmailer = (config: TransportArguments) => {
    return async function inner(args: SendArgs) {
        try {
            const transporter = nodemailer.createTransport(config);
            await verify(transporter);
            const transactionId = await generateId();
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
