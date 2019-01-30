import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'groot-loading-indicator',
  template: `
    <div *ngIf="show">
      <div class="background-mask"></div>
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    </div>
  `,
  styleUrls: ['./loading-indicator.component.scss']
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
