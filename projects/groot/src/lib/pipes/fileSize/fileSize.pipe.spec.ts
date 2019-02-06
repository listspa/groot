import {FileSizePipe} from './fileSize.pipe';

describe('FilesizePipe', () => {
  const pipe = new FileSizePipe();

  it('can format bytes', () => {
    expect(pipe.transform('323')).toEqual('323 B');
  });

  it('can format kilobytes', () => {
    expect(pipe.transform('2048')).toEqual('2 KB');
  });

  it('can format not round kilobytes', () => {
    expect(pipe.transform('9999')).toEqual('9.8 KB');
  });

  it('can format not round kilobytes with an higher precision', () => {
    expect(pipe.transform('9999', 2)).toEqual('9.76 KB');
  });

  it('can format not round kilobytes with a lower', () => {
    expect(pipe.transform('9999', 0)).toEqual('10 KB');
  });

  it('can format megabytes', () => {
    expect(pipe.transform(1024 * 1024 * 3)).toEqual('3 MB');
  });

  it('can format not round megabytes', () => {
    expect(pipe.transform(1024 * 1024 * 5.4)).toEqual('5.4 MB');
  });
});
