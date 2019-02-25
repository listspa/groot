import {Injectable} from '@angular/core';
import {GrootCapabilityService} from '../../../groot/src/lib/services/capability.service';

@Injectable({
  providedIn: 'root'
})
export class DemoCapabilityService extends GrootCapabilityService {
  hasCapability(capabilityName: string): boolean {
    console.log('checking has capability: ' + capabilityName);
    return !capabilityName.startsWith('no-');
  }
}
