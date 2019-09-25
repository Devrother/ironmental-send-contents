import {
    difference,
    union,
    getTimeStamp,
    isEmpty
} from './utils';

test('Difference of set', () => {
    const a = new Set([1, 2, 3, 4, 5]);
    const b = new Set([1, 2, 3]);
    const expectedRes = new Set([4, 5]);
    const res = difference(a, b);
    expect(expectedRes).toEqual(res);
});

test('Union of set', () => {
    const a = new Set([1, 2, 3]);
    const b = new Set([4, 5]);
    const expectedRes = new Set([1, 2, 3, 4, 5]);
    const res = union(a, b);
    expect(expectedRes).toEqual(res);
})

test('Transform time stamp form', () => {
    const date = new Date('11/27/1993');
    const expectedRes = '1993-11-27';
    const res = getTimeStamp(date);
    expect(expectedRes).toEqual(res);
})

describe('Check if object is empty', () => {
    test('Case of array', () => {
        const empty = [];
        const notEmpty = [1, 2, 3];
        const expectedTrue = isEmpty(empty);
        const expectedFalse = isEmpty(notEmpty);
        expect(expectedTrue).toBe(true);
        expect(expectedFalse).toBe(false);
    });

    test('Case of set', () => {
        const empty = new Set([]);
        const notEmpty = new Set([1, 2, 3]);
        const expectedTrue = isEmpty(empty);
        const expectedFalse = isEmpty(notEmpty);
        expect(expectedTrue).toBe(true);
        expect(expectedFalse).toBe(false);
    });

    test('Case of object', () => {
        const empty = {};
        const notEmpty = { a : 'a' };
        const expectedTrue = isEmpty(empty);
        const expectedFalse = isEmpty(notEmpty);
        expect(expectedTrue).toBe(true);
        expect(expectedFalse).toBe(false);
    });
})