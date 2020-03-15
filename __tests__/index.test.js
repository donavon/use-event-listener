import { renderHook } from '@testing-library/react-hooks';
import 'jest-dom/extend-expect';

import useEventListener from '../src';

const mouseMoveEvent = { clientX: 100, clientY: 200 };
let hackHandler = null;

const mockElement = {
  addEventListener: (eventName, handler) => {
    hackHandler = handler;
  },
  removeEventListener: () => {
    hackHandler = null;
  },
  dispatchEvent: event => {
    hackHandler(event);
  },
};

describe('useEventListener', () => {
  test('import useEventListener from "@use-it/event-listener"', () => {
    expect(typeof useEventListener).toBe('function');
  });

  test('you pass an `eventName`, `handler`, and an `element`', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');

    renderHook(() => 
      useEventListener('foo', handler, mockElement)
    );

    expect(addEventListenerSpy).toBeCalled();

    mockElement.dispatchEvent(mouseMoveEvent);
    expect(handler).toBeCalledWith(mouseMoveEvent);

    addEventListenerSpy.mockRestore();
  });

  test('`element` is optional (defaults to `window`/`global`)', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(global, 'addEventListener');

    renderHook(() => 
      useEventListener('foo', handler)
    );

    expect(addEventListenerSpy).toBeCalled();

    addEventListenerSpy.mockRestore();
  });

  test('does not add event listener to `window` if `element` is `null`', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(global, 'addEventListener');

    renderHook(() => 
      useEventListener('foo', handler, null)
    );

    expect(addEventListenerSpy).not.toBeCalledWith('foo', handler);
  });

  test('fails safe with SSR (i.e. no window)', () => {
    const handler = jest.fn();

    renderHook(() => 
      useEventListener('foo', handler, {})
    );
  });
});
