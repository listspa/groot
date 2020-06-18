import {Subscription} from 'rxjs';

export function unsubscribeSafe(subscription: Subscription | null | Array<Subscription>) {
  if (subscription) {
    if (Array.isArray(subscription)) {
      subscription.filter(sub => sub).forEach(sub => sub.unsubscribe());
    } else {
      subscription.unsubscribe();
    }
  }
}
