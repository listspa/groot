import {Directive, Input} from '@angular/core';
import {LoadingService} from '../services/loading.service';

/**
 * Directive that can automatically show or hide the loading indicator on the page
 * based on a boolean variable.
 *
 * @example
 * <div [grootLoading]="loaded">...</div>
 */
@Directive({
  selector: '[grootLoading]'
})
export class LoadingDirective {
  previousStatus: boolean | null = null;
  loadingCallbacks = [];

  constructor(private loadingService: LoadingService) {
  }

  @Input()
  set grootLoading(loading: boolean) {
    if (loading === this.previousStatus) {
      // Nothing to do
    } else if (loading) {
      const doneCallback = this.loadingService.startLoading();
      this.loadingCallbacks.push(doneCallback);
    } else {
      const doneCallback = this.loadingCallbacks.pop();
      doneCallback();
    }
    this.previousStatus = loading;
  }
}
