import {Directive, ElementRef, Input, Renderer2, RendererStyleFlags2} from '@angular/core';
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
    const capabilities = NeedsCapabilityDirective.makeArrayOfCapabilitiesNames(capabilityName);
    const hasCapability = this.hasAtLeastOneOfCapabilities(capabilities);
    if (!hasCapability) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none', RendererStyleFlags2.Important);
    }
  }

  static makeArrayOfCapabilitiesNames(capabilityName: null | undefined | string | string[]): string[] {
    if (!capabilityName) {
      return [];
    } else if (typeof capabilityName !== 'string') {
      return capabilityName;
    } else {
      return capabilityName.toString().split(/\s/);
    }
  }

  private hasAtLeastOneOfCapabilities(capabilities: string[]): boolean {
    // No capabilities means "yes, it's visible". It's an useful default for the menu bar.
    if (!capabilities.length) {
      return true;
    }
    return capabilities.some(c => this.capabilityService.hasCapability(c));
  }
}
