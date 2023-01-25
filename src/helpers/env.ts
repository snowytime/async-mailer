import dotenv from "dotenv";

dotenv.config();

export const env = new Proxy(process.env, {
    get: (envObj, prop) => {
        if (!(prop in envObj)) {
            throw new Error(`Environment variable ${String(prop)} is not defined`);
        }

        return envObj[String(prop)];
    },
}) as { [envKey: string]: string };
