import _ from 'lodash';

import { isValidHouseCode, isValidUnitCode } from '../../src/util/x10-utils';

describe('x10-utils', () => {
  describe('isValidHouseCode', () => {
    it('returns true for A-P', () => {
      const uppercase = [...Array(16)].map((elem, i) => String.fromCharCode('A'.charCodeAt(0) + i));
      _.forEach(uppercase, l => expect(isValidHouseCode(l)).toBe(true));
    });

    it('returns true for a-p', () => {
      const lowercase = [...Array(16)].map((elem, i) => String.fromCharCode('a'.charCodeAt(0) + i));
      _.forEach(lowercase, l => expect(isValidHouseCode(l)).toBe(true));
    });

    it('returns false for Q-Z', () => {
      const uppercase = [...Array(10)].map((elem, i) => String.fromCharCode('Q'.charCodeAt(0) + i));
      _.forEach(uppercase, l => expect(isValidHouseCode(l)).toBe(false));
    });

    it('returns false for q-z', () => {
      const lowercase = [...Array(10)].map((elem, i) => String.fromCharCode('q'.charCodeAt(0) + i));
      _.forEach(lowercase, l => expect(isValidHouseCode(l)).toBe(false));
    });

    it('returns false for numbers', () => {
      _.forEach(_.range(0, 100), n => expect(isValidHouseCode(n)).toBe(false));
    });

    it('returns false for whitespace, null, undefined, and object', () => {
      expect(isValidHouseCode(' ')).toBe(false);
      expect(isValidHouseCode('\t')).toBe(false);
      expect(isValidHouseCode(null)).toBe(false);
      expect(isValidHouseCode(undefined)).toBe(false);
      expect(isValidHouseCode({})).toBe(false);
    });

    it('returns false for special characters', () => {
      expect(isValidHouseCode('`')).toBe(false);
      expect(isValidHouseCode('~')).toBe(false);
      expect(isValidHouseCode('!')).toBe(false);
      expect(isValidHouseCode('@')).toBe(false);
      expect(isValidHouseCode('#')).toBe(false);
      expect(isValidHouseCode('$')).toBe(false);
      expect(isValidHouseCode('%')).toBe(false);
      expect(isValidHouseCode('^')).toBe(false);
      expect(isValidHouseCode('&')).toBe(false);
      expect(isValidHouseCode('*')).toBe(false);
      expect(isValidHouseCode('(')).toBe(false);
      expect(isValidHouseCode(')')).toBe(false);
      expect(isValidHouseCode('-')).toBe(false);
      expect(isValidHouseCode('_')).toBe(false);
      expect(isValidHouseCode('=')).toBe(false);
      expect(isValidHouseCode('+')).toBe(false);
      expect(isValidHouseCode('[')).toBe(false);
      expect(isValidHouseCode('{')).toBe(false);
      expect(isValidHouseCode(']')).toBe(false);
      expect(isValidHouseCode('}')).toBe(false);
      expect(isValidHouseCode('\\')).toBe(false);
      expect(isValidHouseCode('|')).toBe(false);
      expect(isValidHouseCode(';')).toBe(false);
      expect(isValidHouseCode(':')).toBe(false);
      expect(isValidHouseCode('\'')).toBe(false);
      expect(isValidHouseCode('"')).toBe(false);
      expect(isValidHouseCode(',')).toBe(false);
      expect(isValidHouseCode('<')).toBe(false);
      expect(isValidHouseCode('.')).toBe(false);
      expect(isValidHouseCode('>')).toBe(false);
      expect(isValidHouseCode('/')).toBe(false);
      expect(isValidHouseCode('?')).toBe(false);
    });
  });

  describe('isValidUnitCode', () => {
    it('returns true for 1-16', () => {
      _.forEach(_.range(1, 16), n => expect(isValidUnitCode(n)).toBe(true));
    });

    it('returns false for numbers greater than 16', () => {
      _.forEach(_.range(17, 100), n => expect(isValidUnitCode(n)).toBe(false));
    });

    it('returns false for negative numbers and 0', () => {
      _.forEach(_.range(-100, 0), n => expect(isValidUnitCode(n)).toBe(false));
    });

    it('returns false for uppercase letters', () => {
      const uppercase = [...Array(26)].map((elem, i) => String.fromCharCode('A'.charCodeAt(0) + i));
      _.forEach(uppercase, l => expect(isValidUnitCode(l)).toBe(false));
    });

    it('returns false for lowercase letters', () => {
      const lowercase = [...Array(26)].map((elem, i) => String.fromCharCode('a'.charCodeAt(0) + i));
      _.forEach(lowercase, l => expect(isValidUnitCode(l)).toBe(false));
    });

    it('returns false for whitespace, null, undefined, and object', () => {
      expect(isValidUnitCode(' ')).toBe(false);
      expect(isValidUnitCode('\t')).toBe(false);
      expect(isValidUnitCode(null)).toBe(false);
      expect(isValidUnitCode(undefined)).toBe(false);
      expect(isValidUnitCode({})).toBe(false);
    });

    it('returns false for special characters', () => {
      expect(isValidUnitCode('`')).toBe(false);
      expect(isValidUnitCode('~')).toBe(false);
      expect(isValidUnitCode('!')).toBe(false);
      expect(isValidUnitCode('@')).toBe(false);
      expect(isValidUnitCode('#')).toBe(false);
      expect(isValidUnitCode('$')).toBe(false);
      expect(isValidUnitCode('%')).toBe(false);
      expect(isValidUnitCode('^')).toBe(false);
      expect(isValidUnitCode('&')).toBe(false);
      expect(isValidUnitCode('*')).toBe(false);
      expect(isValidUnitCode('(')).toBe(false);
      expect(isValidUnitCode(')')).toBe(false);
      expect(isValidUnitCode('-')).toBe(false);
      expect(isValidUnitCode('_')).toBe(false);
      expect(isValidUnitCode('=')).toBe(false);
      expect(isValidUnitCode('+')).toBe(false);
      expect(isValidUnitCode('[')).toBe(false);
      expect(isValidUnitCode('{')).toBe(false);
      expect(isValidUnitCode(']')).toBe(false);
      expect(isValidUnitCode('}')).toBe(false);
      expect(isValidUnitCode('\\')).toBe(false);
      expect(isValidUnitCode('|')).toBe(false);
      expect(isValidUnitCode(';')).toBe(false);
      expect(isValidUnitCode(':')).toBe(false);
      expect(isValidUnitCode('\'')).toBe(false);
      expect(isValidUnitCode('"')).toBe(false);
      expect(isValidUnitCode(',')).toBe(false);
      expect(isValidUnitCode('<')).toBe(false);
      expect(isValidUnitCode('.')).toBe(false);
      expect(isValidUnitCode('>')).toBe(false);
      expect(isValidUnitCode('/')).toBe(false);
      expect(isValidUnitCode('?')).toBe(false);
    });
  });
});
