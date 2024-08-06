import { JSDOM } from 'jsdom'

function normalizeURL(urlString) {
    if (urlString.length == 0) {
        return ''
    }
    const urlObj = new URL(urlString);
    const normalizedURL = `${urlObj.host}${urlObj.pathname.endsWith('/') ? urlObj.pathname.slice(0, -1) : urlObj.pathname}`;
    return normalizedURL;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');
    let links = [];
    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            try {
                const link = new URL(anchor.getAttribute('href'), baseURL).href;
                links.push(link);
            } catch(err) {
                console.log(`${err.message}: ${href}`)
            }
        }
        
    }
    return links;
}

export { normalizeURL, getURLsFromHTML };