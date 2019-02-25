import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {GrootCapabilityService} from '../services/capability.service';

/**
 * Directive that can automatically show or hide a button depending on whether the user has the necessary capability.
 */
@Directive({
  selector: '[grootNeedsCapability]'
})
export class NeedsCapabilityDirective {
  constructor(private capabilityService: GrootCapabilityService,
              private el: ElementRef,
              private renderer: Renderer2) {
  }

  @Input()
  set grootNeedsCapability(capabilityName: string | string[]) {
    console.log('checking needs capabilities: %o', capabilityName);

    const capabilities = NeedsCapabilityDirective.makeArrayOfCapabilitiesNames(capabilityName);
    const hasCapability = this.hasAtLeastOneOfCapabilities(capabilities);
    if (!hasCapability) {
      this.renderer.addClass(this.el.nativeElement, 'd-none');
    }
  }

  static makeArrayOfCapabilitiesNames(capabilityName: string | string[]): string[] {
    if (typeof capabilityName !== 'string') {
      return capabilityName;
    } else {
      return capabilityName.split(/\s/);
    }
  }

  private hasAtLeastOneOfCapabilities(capabilities: string[]) {
    return capabilities.some(c => this.capabilityService.hasCapability(c));
  }
}
