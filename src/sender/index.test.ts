import test from "ava";
import { SentMessageInfo, Transporter } from "nodemailer";

import { send } from "./index.js";

test("should resolve when message is sent successfully", async (t) => {
    const fakeTransporter = {
        sendMail: (options: any, callback: (error: Error | null, info?: any) => void) => {
            callback(null, { message: "Message sent successfully" });
        },
    } as Transporter<SentMessageInfo>;

    const options = { to: "recipient@example.com", subject: "some email", text: "Hello world" };

    const result = await send({ transporter: fakeTransporter, options });

    t.deepEqual(result, { message: "Message sent successfully" });
});

test("should reject when message is not sent", async (t) => {
    const fakeTransporter = {
        sendMail: (options: any, callback: (error: Error | null, info?: any) => void) => {
            callback(new Error("Message could not be sent"));
        },
    } as Transporter<SentMessageInfo>;

    const options = { to: "recipient@example.com", subject: "some email", text: "Hello world" };

    const error = await t.throwsAsync(() => send({ transporter: fakeTransporter, options }));

    t.is(error.message, "Message could not be sent");
});

test("should reject when message has no content", async (t) => {
    const fakeTransporter = {
        sendMail: (options: any, callback: (error: Error | null, info?: any) => void) => {
            callback(null, { message: "Message sent successfully" });
        },
    } as Transporter<SentMessageInfo>;

    const options = { to: "recipient@example.com", subject: "some email" };

    const error = await t.throwsAsync(() => send({ transporter: fakeTransporter, options }));

    t.is(error.message, "Missing content -- needs either text or html property");
});
