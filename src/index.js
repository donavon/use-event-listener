import { useRef, useEffect, useMemo } from 'react';

const useEventListener = (eventName, handler, element = global, options) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  const capture = options ? options.capture : undefined;
  const passive = options ? options.passive : undefined;

  // Rerun the effect only if capture or passive has actually changed
  const memoOptions = useMemo(() => ({ capture, passive }), [capture, passive]);

  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      const eventListener = event => savedHandler.current(event);
      element.addEventListener(eventName, eventListener, memoOptions);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element, memoOptions]
  );
};

export default useEventListener;
