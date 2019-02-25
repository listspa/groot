export interface Menu {
  label: string;
  icon?: string;
  children?: Menu[][];
  url?: string;
  requiredCapability?: string | string[];
}

export interface SimpleNavBarItem {
  label: string;
  icon?: string;
  children?: SimpleNavBarItem[];
  url?: string;
  requiredCapability?: string | string[];
}
