/**
 * Polyfill that adds "Element.matches" and "Element.closest".
 * To avoid having every client installing a new library, we have embedded it
 * in Groot, since it is so small. The library used is
 * https://github.com/jonathantneal/closest
 */

const ElementPrototype = (window as any).Element.prototype;

if (typeof ElementPrototype.matches !== 'function') {
  // tslint:disable-next-line:max-line-length
  ElementPrototype.matches = ElementPrototype.msMatchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.webkitMatchesSelector || function matches(selector) {
    const element = this;
    const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
    let index = 0;

    while (elements[index] && elements[index] !== element) {
      ++index;
    }

    return Boolean(elements[index]);
  };
}

if (typeof ElementPrototype.closest !== 'function') {
  ElementPrototype.closest = function closest(selector) {
    let element = this;

    while (element && element.nodeType === 1) {
      if (element.matches(selector)) {
        return element;
      }

      element = element.parentNode;
    }

    return null;
  };
}
