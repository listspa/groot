/**
 * Abstract capability service. In your application you will need to implement it.
 */
export abstract class GrootCapabilityService {
  /**
   * Returns whether the user has the given capability.
   */
  abstract hasCapability(capabilityName: string): boolean;
}


/**
 * Dummy implementation of GrootCapabilityService that allows the user to have all the capabilities.
 */
export class NoCheckCapabilityService extends GrootCapabilityService {
  hasCapability(capabilityName: string): boolean {
    return true;
  }
}
