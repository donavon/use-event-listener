/**
 * A custom React Hook that provides a declarative useEventListener.
 */
declare function useEventListener<T extends Event>(
  eventName: string,
  handler: (event: T) => void,
  element?: HTMLElement
): void;

export as namespace useEventListener;
export default useEventListener;
