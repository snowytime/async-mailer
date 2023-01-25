import { SentMessageInfo, Transporter } from "nodemailer";
import { EmailError, Mail } from "../types.js";

export const send = async ({
    transporter,
    options,
}: {
    transporter: Transporter<SentMessageInfo>;
    options: Mail;
}) =>
    new Promise((resolve, reject) => {
        if (!options.html && !options.text) {
            reject(
                new EmailError({
                    message: "Missing content -- needs either text or html property",
                }),
            );
        }
        transporter.sendMail(options, (err, info) => {
            if (err) {
                reject(new EmailError(err));
            } else {
                resolve(info);
            }
        });
    });
