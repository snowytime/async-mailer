import { customAlphabet } from "nanoid";

export const generateId = () => {
    const alphabet = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 21);
    return `m-${alphabet()}`;
};
