type Options = Pick<AddEventListenerOptions, 'capture' | 'passive' | 'once'>;

/**
 * A custom React Hook that provides a declarative useEventListener.
 */
declare function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: HTMLElementEventMap[K],
  // allow null to support usage with `useRef<HTMLElement | null>(null)`
  element: HTMLElement | null,
  options?: Options
): void;
declare function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: DocumentEventMap[K],
  element: Document,
  options?: Options
): void;
declare function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: WindowEventMap[K],
  element?: Window,
  options?: Options
): void;
declare function useEventListener(
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  element?: HTMLElement | Window | Document | null,
  options?: Options
): void;
declare function useEventListener<
  K extends keyof (HTMLElementEventMap & DocumentEventMap & WindowEventMap)
>(
  eventName: K,
  handler: (
    event: (HTMLElementEventMap & DocumentEventMap & WindowEventMap)[K]
  ) => void,
  element?: HTMLElement | Document | Window | null,
  options?: Options
): void;

export as namespace useEventListener;
export default useEventListener;
