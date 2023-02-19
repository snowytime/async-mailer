import test from "ava";
import { SentMessageInfo, Transporter } from "nodemailer";

import { verify } from "./index.js";

test("should resolve when transporter is ready", async (t) => {
    const fakeTransporter = {
        verify: (callback: (error: Error | null, success?: unknown) => void) => {
            callback(null, "Transporter is ready");
        },
    } as Transporter<SentMessageInfo>;

    const result = await verify(fakeTransporter);

    t.is(result, "Transporter is ready");
});

test("should reject when transporter is not ready", async (t) => {
    const fakeTransporter = {
        verify: (callback: (error: Error | null, success?: unknown) => void) => {
            callback(new Error("Transporter is not ready"));
        },
    } as Transporter<SentMessageInfo>;

    const error = await t.throwsAsync(() => verify(fakeTransporter));

    t.is(error.message, "Transporter is not ready");
});
