import { isNull, isString } from 'lodash';

export function isValidHouseCode(houseCode) {
  return !isNull(String(houseCode).match(/^[A-P]$/i));
}

export function isValidUnitCode(unitCode) {
  return !isNull(String(unitCode).match(/^[1-9]$|^1[0-6]$/));
}
