import {Injectable} from '@angular/core';
import {GrootCapabilityService} from '../../../groot/src/lib/groot-base/services/capability.service';

@Injectable({
  providedIn: 'root'
})
export class DemoCapabilityService extends GrootCapabilityService {
  hasCapability(capabilityName: string): boolean {
    console.log('Checking whether the user has capability: ' + capabilityName);
    return !capabilityName.startsWith('no-');
  }
}
