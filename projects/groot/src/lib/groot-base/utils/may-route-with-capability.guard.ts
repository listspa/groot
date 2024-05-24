import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import {GrootCapabilityService} from '../services/capability.service';

/**
 * Guard capable of disallowing access to a route unless the user has the request capability.
 */
@Injectable({
  providedIn: 'root'
})
export class GrootMayRouteWithCapabilityGuard  {
  constructor(private capabilitiesService: GrootCapabilityService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const requiredCap: string | string[] | null = next.data.requiredCapability;
    if (!requiredCap) {
      return true;
    }

    if (Array.isArray(requiredCap)) {
      return requiredCap.some(cap => this.capabilitiesService.hasCapability(cap));
    } else {
      return this.capabilitiesService.hasCapability(requiredCap);
    }
  }
}
