/*
Takes in a string of html and injects the css from the <style> tag into inline css.
*/

import * as htmlMinifier from "html-minifier";
import cssLib from "inline-css";
import { load } from "cheerio";
import { EmailError } from "../types.js";

interface Options {
    clearHead?: boolean;
    htmlString: string;
}
export const inject = async ({ htmlString, clearHead }: Options): Promise<string> => {
    try {
        const newHtml = await cssLib(htmlString, { url: " " });
        await cssLib(htmlString, { url: " " });
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
    } catch (e) {
        if (e instanceof Error) {
            throw new EmailError(e);
        }
        throw e;
    }
};
