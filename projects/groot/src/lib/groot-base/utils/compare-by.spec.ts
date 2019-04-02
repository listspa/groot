import {compareBy} from './compare-by';

const v1 = {
  name: 'Andrea',
  age: 33,
  car: 'Passat'
};

const v2 = {
  name: 'Marco',
  age: 34
};

describe('compareBy', () => {
  describe('can compare numbers', () => {
    it('when a < b', () => {
      expect(compareBy('age')(v1, v2)).toBe(-1);
    });
    it('when a > b', () => {
      expect(compareBy('age')(v2, v1)).toBe(+1);
    });
    it('when a == b', () => {
      expect(compareBy('age')(v1, v1)).toBe(0);
    });
  });

  describe('can compare strings', () => {
    it('when a < b', () => {
      expect(compareBy('name')(v1, v2)).toBe(-1);
    });
    it('when a > b', () => {
      expect(compareBy('name')(v2, v1)).toBe(+1);
    });
    it('when a == b', () => {
      expect(compareBy('name')(v1, v1)).toBe(0);
    });
  });

  describe('nulls are last', () => {
    it('when a < b', () => {
      expect(compareBy('car')(v1, v2)).toBe(-1);
    });
    it('when a > b', () => {
      expect(compareBy('car')(v2, v1)).toBe(+1);
    });
    it('when a == b', () => {
      expect(compareBy('car')(v2, v2)).toBe(0);
    });
  });

  describe('can be reversed', () => {
    it('with numbers', () => {
      expect(compareBy('age', true)(v1, v2)).toBe(+1);
    });
    it('with strings', () => {
      expect(compareBy('name', true)(v2, v1)).toBe(-1);
    });
  });
});
