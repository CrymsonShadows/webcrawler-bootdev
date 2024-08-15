import { argv } from 'node:process';
import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main() {
    if (argv.length < 3) {
        console.log("No website url given to crawl.");
        return;
    } else if (argv.length > 3) {
        console.log("Too many arguments given. Only give the website url to crawl.");
        return;
    }

    const baseURL = argv[2];
    console.log(`The base url to crawl will be ${baseURL}`);

    const pages = await crawlPage(baseURL);
    printReport(pages);
}

main();