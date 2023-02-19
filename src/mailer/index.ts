import nodemailer from "nodemailer";

import { EmailError, Mail } from "../types.js";
import { verify } from "../verify/index.js";
import { generateId } from "#helpers/index.js";
import { send } from "../sender/index.js";

type SendArgs =
    | Mail
    | ((transactionId: string) => Promise<Mail>)
    | ((transactionId: string) => Mail);

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
            if (typeof args === "function") {
                // in this case we generate a custom id to be used in the email
                const transactionId = await generateId();
                const options = await args(transactionId);
                if ((!options.html && !options.text) || !options.to || !options.subject) {
                    throw new EmailError({
                        message: "Email is missing either html or text, or to or subject",
                    });
                }
                await send({ transporter, options });
                // return the transaction id and the options for reference
                return { transactionId, ...options };
            }
            if ((!args.html && !args.text) || !args.to || !args.subject) {
                throw new EmailError({
                    message: "Email is missing either html or text, or to or subject",
                });
            }
            const transactionId = args.transactionId || (await generateId());
            await send({ transporter, options: args });
            return { transactionId, ...args };
        } catch (e) {
            if (e instanceof Error) {
                throw new EmailError(e);
            }
            throw e;
        }
    };
};
