import {DynamicallyLoadedGrootPlugin} from '../../../../groot/src/lib/groot-arch/interfaces/groot-plugin';
import {Menu} from '../../../../groot/src/lib/groot-base/components/nav-bar/nav-bar.model';

export class DemoArchGrootPlugin extends DynamicallyLoadedGrootPlugin {
  constructor() {
    super('Demo Arch', 'demo-arch', 'DemoArchModule');
  }

  protected importModule() {
    return import('./demo-arch.module');
  }

  getRootMenuEntries(): Menu[] | null {
    return null;
  }
}
