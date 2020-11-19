import {EventEmitter, Injectable} from '@angular/core';
import {timer} from 'rxjs';

export type DoneLoading = () => void;

const MINIMUM_LOADING_TIME = 150;

/**
 * Service that can be used to show or hide a loading mask on the whole page.
 *
 * The loading mask is displayed only after some delay, to avoid showing it for 20 ms
 * and "flashing" the page.
 */
@Injectable()
export class LoadingService {
  private callsOutgoing = 0;
  public loadingStatusChanged = new EventEmitter<boolean>();

  public startLoading(): DoneLoading {
    ++this.callsOutgoing;

    // Delay emission of the loading
    const sub = timer(MINIMUM_LOADING_TIME)
      .subscribe(() => {
        if (this.callsOutgoing >= 1) {
          this.loadingStatusChanged.emit(true);
        }
      });
    return () => {
      sub.unsubscribe();
      this.doneLoading();
    };
  }

  private doneLoading(): void {
    --this.callsOutgoing;
    if (this.callsOutgoing === 0) {
      this.loadingStatusChanged.emit(false);
    }

    // Sanity check to help us detect bugs
    if (this.callsOutgoing < 0) {
      throw new Error('Expected to have 0 or more outgoing loading calls, but we have a negative number!');
    }
  }

  /**
   * Pauses one outgoing loading indicator. The result is a callback that resumes it.
   */
  public pauseLoadingCall(): DoneLoading {
    --this.callsOutgoing;
    if (this.callsOutgoing === 0) {
      this.loadingStatusChanged.emit(false);
    }

    return () => {
      ++this.callsOutgoing;
      if (this.callsOutgoing >= 1) {
        this.loadingStatusChanged.emit(true);
      }
    };
  }
}
