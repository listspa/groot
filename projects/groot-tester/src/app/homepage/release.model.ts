export interface Release {
  version: string;
  released: false;
  changes: ReleaseChange[];
}

export interface ReleaseChange {
  type: ReleaseChangeType;
  html: string;
}

export enum ReleaseChangeType {
  BUG_FIX = 'BUG_FIX',
  NEW_FEATURE = 'NEW_FEATURE',
  BREAKING_CHANGE = 'BREAKING_CHANGE'
}
