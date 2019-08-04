import { useRef, useEffect } from 'react';

const useEventListener = (eventName, handler, element = global, useCapture = false) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      const eventListener = event => savedHandler.current(event);
      element.addEventListener(eventName, eventListener, useCapture);
      return () => {
        element.removeEventListener(eventName, eventListener, useCapture);
      };
    },
    [eventName, element]
  );
};

export default useEventListener;
