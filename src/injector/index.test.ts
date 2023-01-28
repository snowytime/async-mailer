import { inject } from "./index.js";

describe("Testing the builder function", () => {
    it("should properly inline the styles", async () => {
        const html = `
            <html>
                <head>
                    <style>
                        body {
                            background-color: red;
                            color: pink;
                        }
                    </style>
                </head>
                <body>
                    <h1>Hello World</h1>
                </body>
            </html>
        `;
        const result = await inject({ htmlString: html, clearHead: true });
        expect(result).equal(
            '<html><body style="background-color:red;color:pink"><h1>Hello World</h1></body></html>',
        );
    });
});
