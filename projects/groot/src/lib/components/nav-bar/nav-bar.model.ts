export interface Menu {
  label: string;
  icon?: string;
  children?: Menu[][];
  url?: string | string[];
}
