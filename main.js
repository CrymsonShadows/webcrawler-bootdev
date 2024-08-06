import { argv } from 'node:process';

function main() {
    if (argv.length < 3) {
        console.log("No website url given to crawl.");
    } else if (argv.length > 3) {
        console.log("Too many arguments given. Only give the website url to crawl.");
    } else {
        console.log(`The base url to crawl will be ${argv[2]}`);
    }
}

main();