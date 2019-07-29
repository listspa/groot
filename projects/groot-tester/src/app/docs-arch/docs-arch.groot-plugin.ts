import {DynamicallyLoadedGrootPlugin} from '../../../../groot/src/lib/groot-arch/interfaces/groot-plugin';
import {Menu} from '../../../../groot/src/lib/groot-base/components/nav-bar/nav-bar.model';

export class DocsArchGrootPlugin extends DynamicallyLoadedGrootPlugin {
  constructor() {
    super('Demo Arch', 'docs-arch', 'DocsArchModule');
  }

  protected importModule() {
    // @ts-ignore
    return import('./docs-arch.module');
  }

  getRootMenuEntries(): Menu[] | null {
    return null;
  }
}
