import {NeedsCapabilityDirective} from './needsCapability.directive';

describe('NeedsCapabilityDirective', () => {
  it('should split capability names for array', () => {
    const arr = NeedsCapabilityDirective.makeArrayOfCapabilitiesNames(['a', 'b', 'c']);
    expect(arr).toEqual(['a', 'b', 'c']);
  });

  it('should split capability names for single string', () => {
    const arr = NeedsCapabilityDirective.makeArrayOfCapabilitiesNames('abc');
    expect(arr).toEqual(['abc']);
  });

  it('should split capability names for string with whitespaces', () => {
    const arr = NeedsCapabilityDirective.makeArrayOfCapabilitiesNames('abc def');
    expect(arr).toEqual(['abc', 'def']);
  });
});
