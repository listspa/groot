import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {DarwinSideBarFirstLevel, DarwinSideBarFirstLevelItem, DarwinSideBarItem, DarwinSideBarMenu, DarwinSideBarSecondLevel, DarwinSideBarThirdLevel} from '../../model/darwin-sidebar.model';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {dropDownOnCreateAnimation} from '../../utils/animations-utils';

@Component({
  selector: 'groot-darwin-side-bar',
  templateUrl: './groot-darwin-side-bar.component.html',
  animations: [dropDownOnCreateAnimation],
})
export class GrootDarwinSideBarComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:variable-name
  private _menu: DarwinSideBarMenu | null = null;
  private routerSubscription: Subscription;
  currentFirstLevel: DarwinSideBarFirstLevel | null;

  /**
   * If true, a second click on the current menu entry will reload it.
   */
  @Input() forceReloadStates = false;

  constructor(private router: Router) {
  }

  get menu(): DarwinSideBarMenu {
    return this._menu;
  }

  @Input()
  set menu(value: DarwinSideBarMenu) {
    this._menu = value;
    this.closeEverything();
  }

  ngOnInit(): void {
    this.routerSubscription = this.subscribeToRoutingEvents();
    this.highlightCurrentItem();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private closeEverything(): void {
    if (!this._menu) {
      return;
    }

    this._menu
      .filter(firstLevel => firstLevel)
      .forEach(firstLevel => {
        firstLevel.open = false;
        firstLevel.children.forEach(secondLevel => {
          secondLevel.open = !!secondLevel.forcedOpen;
          secondLevel.children.forEach(thirdLevel => {
            thirdLevel.selected = false;
          });
        });
      });
  }

  clickOnFirstLevel(firstLevel: DarwinSideBarFirstLevel): void {
    this.closeOtherFirstLevelItems(firstLevel);
    this.currentFirstLevel = firstLevel;
    if (!firstLevel.isSearchButton) {
      firstLevel.open = !firstLevel.open && firstLevel.children && firstLevel.children.length > 0;

      this.navigate(firstLevel);
    } else {
      firstLevel.open = !firstLevel.open;
    }
  }

  private closeOtherFirstLevelItems(firstLevel: DarwinSideBarFirstLevelItem | null): void {
    if (!this._menu) {
      return;
    }

    this._menu
      .filter(item => item && item !== firstLevel)
      .forEach(item => item.open = false);
  }

  clickOnSecondLevel(secondLevel: DarwinSideBarSecondLevel): void {
    if (!secondLevel.forcedOpen) {
      secondLevel.open = !secondLevel.open;
    }

    this.navigate(secondLevel);
  }

  clickOnThirdLevel(thirdLevel: DarwinSideBarThirdLevel): void {
    if (thirdLevel.disabled) {
      return;
    }
    this.navigate(thirdLevel);
  }

  private navigate(item: DarwinSideBarItem): void {
    if (!item.routingTarget) {
      return;
    }

    const target = Array.isArray(item.routingTarget) ? item.routingTarget : [item.routingTarget];

    if (this.forceReloadStates || item.forceReloadStates) {
      // Force a reload of navigation
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(target, item.routingNavigationExtras);
      });
    } else {
      // Standard navigation
      this.router.navigate(target, item.routingNavigationExtras);
    }
  }

  private subscribeToRoutingEvents(): Subscription {
    return this.router.events
      .pipe(filter(e => e instanceof ActivationEnd))
      .subscribe(() => this.highlightCurrentItem());
  }

  private highlightCurrentItem(): void {
    if (!this._menu) {
      return;
    }

    this.deSelectThirdLevels();

    if (this.currentFirstLevel.isSearchButton) {
      return; // Do not change the current item
    }

    this._menu
      .filter(item => item)
      .forEach(firstLevel => {
        const isActive = this.isFirstLevelActive(firstLevel);

        if (isActive) {
          if (this.currentFirstLevel) {
            // If menu was open, leave it open; if it was closed, leave it closed
            const wasOpen = this.currentFirstLevel.open;
            this.currentFirstLevel.open = false;

            firstLevel.open = wasOpen && firstLevel.children && firstLevel.children.length > 0;
          }
          this.currentFirstLevel = firstLevel;
        }
      });
  }

  private isFirstLevelActive(firstLevel: DarwinSideBarFirstLevel): boolean {
    if (firstLevel.isSearchButton) {
      return firstLevel.open;
    }

    if (this.isItemActive(firstLevel)) {
      return true;
    }

    let active = false;
    firstLevel.children.forEach(secondLevel => {
      active = active || this.activateIfNecessarySecondLevel(secondLevel);
    });
    return active;
  }

  private activateIfNecessarySecondLevel(secondLevel: DarwinSideBarSecondLevel): boolean {
    const active = this.isSecondLevelActive(secondLevel);
    if (active) {
      secondLevel.open = true;
    }
    return active;
  }

  private isSecondLevelActive(secondLevel: DarwinSideBarSecondLevel): boolean {
    if (this.isItemActive(secondLevel)) {
      return true;
    }

    let active = false;
    secondLevel.children.forEach(thirdLevel => {
      active = active || this.activateThirdLevel(thirdLevel);
    });
    return active;
  }

  private activateThirdLevel(thirdLevel: DarwinSideBarThirdLevel): boolean {
    if (this.isItemActive(thirdLevel)) {
      thirdLevel.selected = true;
      return true;
    }
    return false;
  }

  private deSelectThirdLevels(): void {
    if (!this._menu) {
      return;
    }

    this._menu
      .filter(firstLevel => firstLevel)
      .forEach(firstLevel => {
        firstLevel.children.forEach(secondLevel => {
          secondLevel.children.forEach(thirdLevel => {
            thirdLevel.selected = false;
          });
        });
      });
  }

  private isItemActive(item: DarwinSideBarItem): boolean {
    if (item.routingTarget) {
      const target = Array.isArray(item.routingTarget) ? item.routingTarget : [item.routingTarget];
      const itemUrl = this.router.createUrlTree(target, item.routingNavigationExtras).toString();
      return this.router.url === itemUrl;
    }
    return false;
  }
}
