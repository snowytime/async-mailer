# 🚧 Under active development 🚧

```ts
// here are all the possible things you can extract
import { verify, send, initiate, create, inject, builder } from "@snowytime/snowmailer";
```

-   🚨 `v.0`
-   while the package is in active development, it is very likely to change without notice, which means the package will also keep changing while in `v.0`.
-   The package can still be used but review the updates to new versions beforehand to make sure nothing breaks.
-   You can always go through the src directory to see how the functions are implemented to reproduce in your project without using the unstable package in the early versions.

## Why

I love using Nodemailer and have been using it for a long time. I just wanted to improve it in a couple of ways that I find useful, and also make it easier to plug into the async/await cycle, and also support for a custom template syntax w/ built in css injector.

-   works the same as good ol nodemailer. You can pass it attachments, text content, html content, all the same.
-   Make sure you set `EMAIL_PROVIDER, EMAIL_USERNAME, USER_PASSWORD` in your .env for snowmailer to work.

## Usage

```ts
import { snowmailer } from "@snowytime/snowmailer";

// use it

// note that the mailer will fail if any step fails
// if it passes, it will return a transactionId that
// you could use
const transId = await snowmailer(async (id) => {
    const { subject, template } = await someTemplate({
        orderId: "o-124",
        trackId: transactionId,
        // any other custom props to pass to the template
    });
    // must return a Mail object
    return {
        to: "john@appleseed.com",
        subject,
        // if using templates ^^ make sure to use the html
        html: template,
        attachments: [],
    };
});

// example of a template
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
```

Email clients will remove the head tag, so the builder will automatically inline all the properties and remove the head. This makes sure that all email clients will not fuck everything up.
