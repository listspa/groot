export interface AbstractNavBarItem {
  label?: string;
  icon?: string;
  url?: string;
  requiredCapability?: string | string[];
  isTitle?: boolean;
  isSeparator?: boolean;
}

export interface Menu extends AbstractNavBarItem {
  children?: Menu[][];
}

export interface SimpleNavBarItem extends AbstractNavBarItem {
  children?: SimpleNavBarItem[];
}
