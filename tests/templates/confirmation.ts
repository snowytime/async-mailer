import { EmailError, builder } from "../../src/index.js";

export const confirmationTemplate = async ({ orderId, trackId }) => {
    // we can run any kind of logic in here
    if (!orderId) throw new EmailError({ message: "orderId is required" });
    return {
        subject: `Order Confirmation #${orderId}`,
        template: await builder(/* html */ `
            <style>
                h1 {
                    color: red;
                    font-size: 20px;
                }
                .id {
                    position: absolute;
                    top: 0;
                    right: 0;
                    font-size: 1px;
                    color: transparent;
                    user-select: none;
                    display: none;
                }
            </style>
            <body>
                <h1 style="font-size: 30px">Order Confirmation</h1>
                <p>Thank you for your order!</p>
                <p>Order ID: ${orderId}</p>
                <code class="id">${trackId}</code>
            </body>
            `),
    };
};
