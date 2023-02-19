/*
When snowmailer executes a send command, the transactionId is generated
and can be passed to the template that you use. This is useful for
tracking emails and for debugging purposes, and can be stored in your
database for future reference. Plus if you use this and embed this id somewhere
in your template, you can use it to track the email in your email client very
easily even without having it shown anywhere in the email itself (display: none;)
Note the actual snowmailer() function returns the id if you choose to use it.
*/
import { customAlphabet } from "nanoid";

export const generateId = async () => {
    const alphabet = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 21);
    return alphabet();
};
