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

- works the same as good ol nodemailer. You can pass it attachments, text content, html content, all the same.
- to ensure things are easy to use, just have this in a file you setup somewhere:
```ts
import { initiate } from '@snowytime/snowmailer';

export default initiate({
    provider: env.EMAIL_PROVIDER,
    username: env.EMAIL_USERNAME,
    password: env.EMAIL_PASSWORD // <-- in most cases this will be a token
});

// .. in some file
import mailer from '@/some/path/to/module.js';

// use it
await mailer.send({ ...stuff });
await mailer.verify({ ...stuff })
```
- it starts to get really fun when we start using the template features of this thing. Basically aside from just html and text there is also a template option. This is the same as html but accepts the `builder` function which is really neat.
```ts
import { builder } from '@snowytime/snowmailer';

await mailer.send({
    subject: '...',
    to: '...',
    attachments: [...],
    template: await builder('path/to/template.snow', {
        // pass data to dynamically hydrate the template
        id: 'sha883jus7sa',
        code: 224302,
        name: {
            first: 'John',
            last: 'Appleseed'
        }
    })
})
```
- what is this gross new file? literally just a html file that looks like this:
```html
<style>
    h1 {
        color: green;
        size: 20px;
    }
    .title {
        color: red;
    }
    .text {
        font-family: 'Arial';
    }
</style>

<html>
    <h1>Hello {{ name.first }}</h1>
    <code>{{ code }}</code>
    <p>Ref: {{ id }}</p>
</html>

<!-- this code gets compiled and compressed into  -->
<html><body><h1 style="color:green;size:20px;color:red">Hello John</h1><code>224302</code><p>Ref: sha883jus7sa</p></body></html>
<!-- which is perfect for email clients -->
```

It is well known that gmail (which is really the only real mail client) decapitates your html email so forget about all styles that are not inline. This solves that problem.
