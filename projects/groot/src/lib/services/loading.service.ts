import {EventEmitter, Injectable} from '@angular/core';

/**
 * Service that can be used to show or hide a loading mask on the whole page.
 */
@Injectable()
export class LoadingService {
  private callsOutgoing = 0;
  public loadingStatusChanged = new EventEmitter<boolean>();

  public startLoading(): void {
    ++this.callsOutgoing;
    if (this.callsOutgoing === 1) {
      this.loadingStatusChanged.emit(true);
    }
  }

  public doneLoading(): void {
    --this.callsOutgoing;
    if (this.callsOutgoing === 0) {
      this.loadingStatusChanged.emit(false);
    }

    // Sanity check to help us detect bugs
    if (this.callsOutgoing < 0) {
      throw new Error('Expected to have 0 or more outgoing loading calls, but we have a negative number!');
    }
  }
}
