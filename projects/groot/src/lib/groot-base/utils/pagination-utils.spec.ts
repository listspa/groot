import {endIndex, startIndex} from './pagination-utils';

describe('startIndex', () => {
  it('firstPage', () => {
    expect(startIndex({pageNum: 0, pageLen: 10})).toEqual(0);
  });

  it('not first page', () => {
    expect(startIndex({pageNum: 1, pageLen: 10})).toEqual(10);
  });
});

describe('endIndex', () => {
  it('firstPage', () => {
    expect(endIndex({pageNum: 0, pageLen: 10})).toEqual(10);
  });

  it('not first page', () => {
    expect(endIndex({pageNum: 1, pageLen: 10})).toEqual(20);
  });
});
