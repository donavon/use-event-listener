/* eslint-disable max-params */
import { useRef, useEffect } from 'react';

const globalObject = typeof window === 'undefined' ? global : window

const useEventListener = (
  eventName,
  handler,
  element = globalObject,
  options = {}
) => {
  const savedHandler = useRef();
  const { capture, passive, once } = options;

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return;
    }

    const eventListener = (event) => savedHandler.current(event);
    const opts = { capture, passive, once };
    element.addEventListener(eventName, eventListener, opts);
    return () => {
      element.removeEventListener(eventName, eventListener, opts);
    };
  }, [eventName, element, capture, passive, once]);
};

export default useEventListener;
