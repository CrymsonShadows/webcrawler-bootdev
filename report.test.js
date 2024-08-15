import { sortPages } from "./report.js";

test('sortPages returns sorted pages largest to smallest', () => {
    const input = {
        'examplepage.com': 3,
        'examplepage.com/about': 2,
        'examplepage.com/bear': 4,
        'examplepage.com/foo': 5
    }
    const actual = sortPages(input);
    const expected = [
        ['examplepage.com/foo', 5],
        ['examplepage.com/bear', 4],
        ['examplepage.com', 3],
        ['examplepage.com/about', 2]   
    ];
    expect(actual).toEqual(expected);
})