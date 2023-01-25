/*
Use the verify function exposed by nodemailer to verify
a transporter is ready to send mail.
*/

import { SentMessageInfo, Transporter } from "nodemailer";

export const verify = (transporter: Transporter<SentMessageInfo>) => {
    return new Promise((resolve, reject) => {
        transporter.verify((error, success) => {
            if (error) {
                // theres an error
                reject(error);
            } else {
                // server is ready
                resolve(success);
            }
        });
    });
};
