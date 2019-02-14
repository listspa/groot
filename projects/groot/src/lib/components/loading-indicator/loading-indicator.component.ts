import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'groot-loading-indicator',
  template: `
    <div *ngIf="show">
      <div class="groot-loading-indicator-background-mask"></div>
      <svg class="groot-loading-indicator-spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    </div>
  `
})
export class LoadingIndicatorComponent implements OnInit {
  show = false;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.loadingStatusChanged
      .subscribe(show => this.show = show);
  }
}
