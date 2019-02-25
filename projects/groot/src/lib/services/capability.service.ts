/**
 * Abstract capability service. In your application you will need to implement it.
 */
export abstract class GrootCapabilityService {
  abstract hasCapability(capabilityName: string): boolean;
}
