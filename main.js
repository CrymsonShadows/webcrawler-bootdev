import { JSDOM } from 'jsdom'
const urlObj = new URL('https://google.com', 'https://example.com');
console.log(urlObj.href)

