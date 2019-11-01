import { EventHandler, SyntheticEvent } from 'react';

/**
 * A custom React Hook that provides a declarative useEventListener.
 */
declare function useEventListener<T extends SyntheticEvent<any>>(
  eventName: string,
  handler: EventHandler<T>,
  element?: HTMLElement | null
): void;

export as namespace useEventListener;
export default useEventListener;
