import { confirmationTemplate } from "../examples/confirmation.js";
import { snowmailer } from "./index.js";

const main = async () => {
    // every successful email will return a transaction id that you can save and even use in your template
    const id = await snowmailer(async (transactionId) => {
        const { subject, template } = await confirmationTemplate({
            orderId: "o-124",
            trackId: transactionId,
        });
        // must return a Mail object
        return {
            to: "snaer@ualberta.ca",
            subject,
            html: template,
        };
    });
    console.log(id);
};

main();
