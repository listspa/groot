(function () {
  try {
    // tslint:disable-next-line:no-unused-expression
    new MouseEvent('test');
    return false; // No need to polyfill
  } catch (e) {
    // Need to polyfill - fall through
  }

  // Polyfills DOM4 MouseEvent
  const MouseEventPolyfill = function (eventType, params) {
    params = params || {bubbles: false, cancelable: false};
    const mouseEvent = document.createEvent('MouseEvent');
    mouseEvent.initMouseEvent(eventType,
      params.bubbles,
      params.cancelable,
      window,
      0,
      params.screenX || 0,
      params.screenY || 0,
      params.clientX || 0,
      params.clientY || 0,
      params.ctrlKey || false,
      params.altKey || false,
      params.shiftKey || false,
      params.metaKey || false,
      params.button || 0,
      params.relatedTarget || null
    );

    return mouseEvent;
  };

  MouseEventPolyfill.prototype = Event.prototype;

  (window as any).MouseEvent = MouseEventPolyfill;
})();
