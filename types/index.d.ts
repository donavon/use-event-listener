/**
 * A custom React Hook that provides a declarative useEventListener.
 */
declare function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: HTMLElementEventMap[K],
  element: HTMLElement
);
declare function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: DocumentEventMap[K],
  element: Document
);
declare function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: WindowEventMap[K],
  element?: Window
);
declare function useEventListener(
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  element?: HTMLElement | Window | Document
);
declare function useEventListener<
  K extends keyof (HTMLElementEventMap & DocumentEventMap & WindowEventMap)
>(
  eventName: K,
  handler: (
    event: (HTMLElementEventMap & DocumentEventMap & WindowEventMap)[K]
  ) => void,
  element?: HTMLElement | Document | Window
): void;

export as namespace useEventListener;
export default useEventListener;
