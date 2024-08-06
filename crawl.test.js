import { test, expect } from "@jest/globals";
import { getURLsFromHTML, normalizeURL } from "./crawl.js";

test('normalizeURL', () => {
    const input = ''
    const actual = normalizeURL(input)
    const expected = ''
    expect(actual).toEqual(expected)
})

test('normalizeURL with https and / path', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
})

test('normalizeURL with https and no given path', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
})

test('normalizeURL with http and / path', () => {
    const input = 'http://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
})

test('normalizeURL with http and no given path', () => {
    const input = 'http://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML getting multiple URLs from html', () => {
    const input = `<html>
        <body>
            <a href="https://example.com">example</a>
            <a href="http://example.com/foo">example 2</a>
        </body>
    </html>`
    const actual = getURLsFromHTML(input, 'https://example.com');
    const expected = ['https://example.com/', 'http://example.com/foo'];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML converts relative path to absolute', () => {
    const input = `<html>
        <body>
            <a href="https://example.com">example</a>
            <a href="/foo">example 2</a>
        </body>
    </html>`
    const actual = getURLsFromHTML(input, 'https://example.com');
    const expected = ['https://example.com/', 'https://example.com/foo'];
    expect(actual).toEqual(expected);
})