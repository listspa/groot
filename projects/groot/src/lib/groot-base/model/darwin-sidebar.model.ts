import {NavigationExtras} from '@angular/router';

export type DarwinSideBarMenu = DarwinSideBarFirstLevel[];
export type DarwinSideBarFirstLevel = DarwinSideBarFirstLevelItem | null;

export interface DarwinSideBarItem {
  label: string;
  routingTarget?: any[] | any;
  routingNavigationExtras?: NavigationExtras;
  externalUrl?: string;
  externalUrlInPopup?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  requiredCapabilities?: string | string[];
  additionalClasses?: string | string[] | null;
  tags?: { [key: string]: string[] };   // For search purposes. Key is the language (en, it, ...).
  forceReloadStates?: boolean;
  isSearchButton?: boolean;
}

export interface DarwinSideBarFirstLevelItem extends DarwinSideBarItem {
  icon?: string | string[];
  image?: string | string[];
  children: DarwinSideBarSecondLevel[];
  open?: boolean;   // Do not set directly
}

export interface DarwinSideBarSecondLevel extends DarwinSideBarItem {
  forcedOpen?: boolean;
  children: DarwinSideBarThirdLevel[];
  open?: boolean;   // Do not set directly
}

export interface DarwinSideBarThirdLevel extends DarwinSideBarItem {
  selected?: boolean;   // Do not set directly
}
