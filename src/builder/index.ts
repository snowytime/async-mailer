import { inject } from "../injector/index.js";
import { EmailError } from "../types.js";

export const builder = async (html: string, clearHead = true): Promise<string> => {
    try {
        return await inject({ htmlString: html, clearHead });
    } catch (e) {
        if (e instanceof Error) {
            throw new EmailError(e);
        }
        throw e;
    }
};
