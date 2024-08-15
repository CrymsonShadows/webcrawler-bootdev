function printReport(pages) {
    console.log('\nStarting Report...\n');
    const sortedPages = sortPages(pages);
    for (const page of sortedPages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`);
    }
}

function sortPages(pages) {
    let pagesArr = Object.entries(pages);
    pagesArr = pagesArr.sort((a, b) => b[1] - a[1]);
    return pagesArr;
}

export { sortPages, printReport };