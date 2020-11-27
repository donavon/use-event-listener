import { useRef, useEffect, MutableRefObject } from 'react';
import { globalEventTarget } from 'global-event-target'; // window, global, globalThis, or null if SSR

export type Options = {
  /** The element to listen on. Defaults to `global` (i.e. `window`). */
  element?: EventTarget | MutableRefObject<EventTarget | null> | null;
  /** Indicates events will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. */
  capture?: boolean;
  /** Indicates that the handler will never call `preventDefault()`. */
  passive?: boolean;
  /** Indicates that the handler should be invoked at most once after being added. If true, the handler would be automatically removed when invoked. */
  once?: boolean;
};

interface EventListener<T> {
  (evt: T): void;
}
interface EventListenerObject<T> {
  handleEvent(evt: T): void;
}

type EventListenerOrEventListenerObject<T> =
  | EventListener<T>
  | EventListenerObject<T>;

/** Provides a declarative addEventListener */
const useEventListener = <T,>(
  /** eventName - The name of the event. */
  eventName: string,
  /** A function that handles the event or an object implementing the `EventListener` interface. */
  handler: EventListenerOrEventListenerObject<T>,
  /** A optional object containing `element`, `capture`, `passive`, and `once`. */
  options: Options = {}
) => {
  const savedHandlerRef = useRef<EventListenerOrEventListenerObject<T>>();
  const { element = globalEventTarget, capture, passive, once } = options;

  useEffect(() => {
    savedHandlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const isRefObject = element?.hasOwnProperty('current');
    const currentTarget = isRefObject
      ? (element as MutableRefObject<EventTarget | null>).current
      : (element as EventTarget | null);

    if (
      currentTarget === null ||
      typeof currentTarget.addEventListener !== 'function'
    ) {
      return;
    }

    const eventListener = (evt: Event) => {
      const event = (evt as unknown) as any;
      if (savedHandlerRef.current!.hasOwnProperty('handleEvent')) {
        (savedHandlerRef.current! as EventListenerObject<T>).handleEvent(event);
      } else {
        (savedHandlerRef.current! as EventListener<T>)(event);
      }
    };

    const opts = { capture, passive, once };
    currentTarget.addEventListener(eventName, eventListener, opts);
    return () => {
      currentTarget.removeEventListener(eventName, eventListener, opts);
    };
  }, [eventName, element, capture, passive, once]);
};

export default useEventListener;
