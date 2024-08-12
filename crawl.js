import { JSDOM } from 'jsdom'
import { get } from 'node:https';

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
            let link = anchor.getAttribute('href');
            try {
                link = new URL(link, baseURL).href;
                links.push(link);
            } catch(err) {
                console.log(`${err.message}: ${link}`)
            }
        }
        
    }
    return links;
}

async function fetchPage(currentURL) {
    let response;
    try {
        response = await fetch(currentURL);
    } catch (err) {
        throw new Error(`Got Network error: ${err.message}`);
    }

    if (response.status > 399) {
        console.log(`Got HTTP error: ${response.status} ${response.statusText}`);
        return
    }
        
    const contentType = response.headers.get('Content-Type');
    
    if (!contentType || !contentType.includes('text/html')) {
        console.log('Response is not HTML');
        return
    }
    
    const html = await response.text();
    return html;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const baseURLDomain = new URL(baseURL).hostname;
    const currentURLDomain = new URL(currentURL).hostname;
    if (!currentURLDomain.includes(baseURLDomain)) {
        return pages;
    }
    const normalizedCurrentURL = normalizeURL(currentURL);
    if (!pages[normalizedCurrentURL]) {
        pages[normalizedCurrentURL] = 1;
    } else {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    const html = await fetchPage(currentURL);
    const urls = getURLsFromHTML(html, baseURL);
    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages);
    }
    return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };