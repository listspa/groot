import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'groot-page-title',
  templateUrl: './page-title.component.html'
})
export class PageTitleComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() icon: string | string[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Subscribe to the "data" of the activated route.
    // Using directly ActivatedRoute::data doesn't seem to work.
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          let r = route;
          while (r.children && r.children.length) {
            r = r.children[r.children.length - 1];
          }
          return r;
        }),
        filter(route => !!route),
        switchMap(route => route.data),
      )
      .subscribe(data => {
        if (data && data.pageTitle) {
          this.title = data.pageTitle.title;
          this.subTitle = data.pageTitle.subTitle;
          this.icon = data.pageTitle.icon;
        } else {
          this.title = null;
          this.subTitle = null;
          this.icon = null;
        }
      });
  }
}
