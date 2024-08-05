function normalizeURL(urlString) {
    if (urlString.length == 0) {
        return ''
    }
    const urlObj = new URL(urlString);
    const normalizedURL = `${urlObj.host}${urlObj.pathname.endsWith('/') ? urlObj.pathname.slice(0, -1) : urlObj.pathname}`;
    return normalizedURL;
}

export { normalizeURL };