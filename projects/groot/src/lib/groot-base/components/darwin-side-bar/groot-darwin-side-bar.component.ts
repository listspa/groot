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
  private _menu: DarwinSideBarMenu;
  private routerSubscription: Subscription;
  currentFirstLevel: DarwinSideBarFirstLevel | null;

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

  ngOnInit() {
    this.routerSubscription = this.subscribeToRoutingEvents();
    this.highlightCurrentItem();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private closeEverything() {
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

  clickOnFirstLevel(firstLevel: DarwinSideBarFirstLevel) {
    this.closeOtherFirstLevelItems(firstLevel);
    firstLevel.open = !firstLevel.open && firstLevel.children && firstLevel.children.length > 0;
    this.currentFirstLevel = firstLevel;

    this.navigate(firstLevel);
  }

  private closeOtherFirstLevelItems(firstLevel: DarwinSideBarFirstLevelItem | null) {
    this._menu
      .filter(item => item && item !== firstLevel)
      .forEach(item => item.open = false);
  }

  clickOnSecondLevel(secondLevel: DarwinSideBarSecondLevel) {
    if (!secondLevel.forcedOpen) {
      secondLevel.open = !secondLevel.open;
    }

    this.navigate(secondLevel);
  }

  clickOnThirdLevel(thirdLevel: DarwinSideBarThirdLevel) {
    this.navigate(thirdLevel);
  }

  private navigate(item: DarwinSideBarItem) {
    if (!item.routingTarget) {
      return;
    }

    const target = Array.isArray(item.routingTarget) ? item.routingTarget : [item.routingTarget];
    this.router.navigate(target, item.routingNavigationExtras);
  }

  private subscribeToRoutingEvents(): Subscription {
    return this.router.events
      .pipe(filter(e => e instanceof ActivationEnd))
      .subscribe(() => this.highlightCurrentItem());
  }

  private highlightCurrentItem() {
    if (!this._menu) {
      return;
    }

    this.deSelectThirdLevels();

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

  private deSelectThirdLevels() {
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
