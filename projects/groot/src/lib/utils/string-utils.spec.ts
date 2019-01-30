import {leftPad, rightPad} from './string-utils';

describe('leftPad', () => {
  it('can pad a string that requires it', () => {
    const output = leftPad('ABC', 4, 'x');
    expect(output).toEqual('xABC');
  });

  it('will not pad a string that does not require it', () => {
    const output = leftPad('ABC', 2, 'x');
    expect(output).toEqual('ABC');
  });
});

describe('rightPad', () => {
  it('can pad a string that requires it', () => {
    const output = rightPad('ABC', 4, 'x');
    expect(output).toEqual('ABCx');
  });

  it('will not pad a string that does not require it', () => {
    const output = rightPad('ABC', 2, 'x');
    expect(output).toEqual('ABC');
  });
});
