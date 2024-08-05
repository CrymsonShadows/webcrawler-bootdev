import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

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