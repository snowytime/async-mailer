import { load } from "cheerio";
import { promises } from "node:fs";
import { join } from "node:path";
import * as htmlMinifier from "html-minifier";
import cssLib from "inline-css";

interface Properties {
    [key: string]: any;
}
const inlineCss = async (filePath: string, properties: Properties, clearHead = false) => {
    try {
        const fileContent = await promises.readFile(filePath, "utf8");
        let newHtml = await cssLib(fileContent, { url: filePath });
        const regex = /{{ *([^{} ]+) *}}/g;
        let match = regex.exec(newHtml);
        while (match !== null) {
            let value = properties;
            const keys = match[1].split(".");
            value = keys.reduce((prev, key) => prev && prev[key], value);
            newHtml = newHtml.replace(match[0], value !== undefined ? value.toString() : "");
            match = regex.exec(newHtml);
        }
        const $ = load(newHtml);
        $("*").removeAttr("class").removeAttr("id");
        if (clearHead) {
            $("head").remove();
        }
        const minifiedHtml = htmlMinifier.minify($.html(), {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
        });
        return minifiedHtml;
    } catch (err) {
        console.log(err);
    }
};

const generatedTemplate = await inlineCss(
    join(process.cwd(), "demo/templates/confirmation.snow"),
    {
        name: {
            first: "John",
            last: "Doe",
        },
        code: "1234567890",
        id: "ahsjaas7suajsu",
    },
    true,
);

console.log(generatedTemplate);
