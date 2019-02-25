export interface Menu {
  label: string;
  icon?: string;
  children?: Menu[][];
  url?: string;
  requiredCapability?: string | string[];
}
