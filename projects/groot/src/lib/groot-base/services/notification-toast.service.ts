import {EventEmitter, Injectable} from '@angular/core';
import {forkJoin, Observable, of, ReplaySubject, timer} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

export enum ToastStyle {
  PRIMARY = 'PRIMARY',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  DANGER = 'DANGER'
}

export class Toast {
  public readonly doRemove: () => void;

  constructor(public readonly style: ToastStyle,
              public readonly title: string | null,
              public readonly label: string,
              public readonly additionalDetails: string | null,
              public readonly icon: string[],
              public readonly clickable: boolean,
              public readonly clickCallback: EventEmitter<Toast>,
              removeCbk: (Toast) => void) {
    this.doRemove = () => removeCbk(this);
  }
}

/**
 * New toast configuration
 */
export interface NewToastConfig {
  label: string;
  style?: ToastStyle;
  title?: string;
  icon?: string | string[];
  translateLabel?: boolean;
  translateLabelArgs?: any;
  translateTitle?: boolean;
  translateTitleArgs?: any;
  clickable?: boolean;
  autoRemove?: boolean;
  additionalDetails?: string | null;
}

const DEFAULT_TOAST_CONFIG: NewToastConfig = {
  label: null,
  style: ToastStyle.PRIMARY,
  title: null,
  icon: [],
  translateLabel: true,
  translateLabelArgs: {},
  translateTitle: true,
  translateTitleArgs: {},
  clickable: true,
  autoRemove: true,
  additionalDetails: null
};

/**
 * Service to create a toast.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationToastService {
  /**
   * Time for auto-removal of toasts. Can be overridden.
   */
  private static AUTO_REMOVE_TIME = 5000;

  public static overrideAutoRemoveTime(autoRemoveMs: number): void {
    NotificationToastService.AUTO_REMOVE_TIME = autoRemoveMs;
  }

  /* tslint:disable:member-ordering */
  toastAdded = new ReplaySubject<Toast>();
  toastRemoved = new ReplaySubject<Toast>();

  constructor(private translate: TranslateService) {
  }

  public addToast(config: NewToastConfig): Observable<Toast> {
    const actualConfig: NewToastConfig = {
      ...DEFAULT_TOAST_CONFIG,
      ...config
    };

    const callback = new EventEmitter<Toast>();

    const title$: Observable<string> = actualConfig.translateTitle && actualConfig.title ?
      this.translate.get(actualConfig.title, actualConfig.translateTitleArgs) : of(actualConfig.title || '');
    const label$: Observable<string> = actualConfig.translateLabel && actualConfig.label ?
      this.translate.get(actualConfig.label, actualConfig.translateLabelArgs) : of(actualConfig.label || '');

    forkJoin(title$, label$)
      .subscribe(([title, label]) => {
        const newToast = new Toast(
          actualConfig.style, title, label, actualConfig.additionalDetails,
          NotificationToastService.handleIcon(actualConfig),
          actualConfig.clickable,
          callback,
          this.removeToast.bind(this)
        );

        this.toastAdded.next(newToast);

        if (actualConfig.autoRemove) {
          timer(NotificationToastService.AUTO_REMOVE_TIME).subscribe(() => newToast.doRemove());
        }
      });

    return callback;
  }

  private static handleIcon(config: NewToastConfig): string[] {
    if (!config.icon) {
      return [];
    } else if (typeof config.icon === 'string') {
      return config.icon.split(/\\s/);
    } else {
      return config.icon;
    }
  }

  private removeToast(newToast: Toast) {
    this.toastRemoved.next(newToast);
  }

  public showGenericSavedNotification() {
    this.addToast({
      title: 'common.dynamicGui.saved.title',
      icon: 'fa-solid fa-check',
      label: 'common.dynamicGui.saved.details',
      style: ToastStyle.SUCCESS
    });
  }

  public showGenericCannotSaveNotification(response: any = null) {
    const additionalDetails = response ? response.data ? response.data.message : null : null;
    this.addToast({
      title: 'common.dynamicGui.cannotSave.title',
      icon: 'fa-regular fa-face-frown',
      label: 'common.dynamicGui.cannotSave.details',
      style: ToastStyle.DANGER,
      additionalDetails
    });
  }

  public showGenericCannotLoadNotification(response: any = null) {
    const additionalDetails = response ? response.data ? response.data.message : null : null;
    this.addToast({
      title: 'common.dynamicGui.cannotLoad.title',
      icon: 'fa-regular fa-face-frown',
      label: 'common.dynamicGui.cannotLoad.details',
      style: ToastStyle.DANGER,
      additionalDetails
    });
  }

  public showGenericCannotDownloadNotification(response: any = null) {
    const additionalDetails = response ? response.data ? response.data.message : null : null;
    this.addToast({
      title: 'common.dynamicGui.cannotDownload.title',
      icon: 'fa-regular fa-face-frown',
      label: 'common.dynamicGui.cannotDownload.details',
      style: ToastStyle.DANGER,
      additionalDetails
    });
  }
}
