/* eslint-disable jest/no-disabled-tests */
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';

import useEventListener from '../src';

const mouseMoveEvent = { clientX: 100, clientY: 200 };
let hackHandler = null;

const mockElement = {
  addEventListener: (eventName, handler, options) => {
    hackHandler = handler;
  },
  removeEventListener: () => {
    hackHandler = null;
  },
  dispatchEvent: (event) => {
    hackHandler(event);
  },
};

describe('useEventListener', () => {
  test('import useEventListener from "@use-it/event-listener"', () => {
    expect(typeof useEventListener).toBe('function');
  });

  test('you pass an `eventName`, `handler`, and an `element`', async () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');

    const { waitForNextUpdate } = renderHook(() =>
      useEventListener('foo', handler, mockElement)
    );

    await waitForNextUpdate;
    expect(addEventListenerSpy).toBeCalled();

    mockElement.dispatchEvent(mouseMoveEvent);
    expect(handler).toBeCalledWith(mouseMoveEvent);

    addEventListenerSpy.mockRestore();
  });

  test.skip('`element` is optional (defaults to `window`/`global`)', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(global, 'addEventListener');

    renderHook(() => useEventListener('foo', handler));

    expect(addEventListenerSpy).toBeCalled();

    addEventListenerSpy.mockRestore();
  });

  test.skip('does not add event listener to `window` if `element` is `null`', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(global, 'addEventListener');

    renderHook(() => useEventListener('foo', handler, null));

    expect(addEventListenerSpy).not.toBeCalledWith('foo', handler);
  });

  test.skip('fails safe with SSR (i.e. no window)', () => {
    const handler = jest.fn();

    renderHook(() => useEventListener('foo', handler, {}));
  });

  test('`options` are passed to `addEventListener`', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');

    renderHook(() => {
      useEventListener('foo', handler, mockElement, {
        capture: true,
        passive: true,
      });
    });

    expect(addEventListenerSpy).toBeCalledWith(
      'foo',
      expect.any(Function),
      expect.objectContaining({ capture: true, passive: true })
    );

    addEventListenerSpy.mockRestore();
  });

  test('changing the identity of `options` does not cause effect to rerun', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');

    const { rerender } = renderHook(() => {
      useEventListener('foo', handler, mockElement, {
        capture: true,
        passive: true,
      });
    });
    const numberOfCalls = addEventListenerSpy.mock.calls.length;

    rerender(() => {
      useEventListener('foo', handler, mockElement, {
        capture: true,
        passive: true,
      });
    });
    expect(addEventListenerSpy).toBeCalledTimes(numberOfCalls);

    addEventListenerSpy.mockRestore();
  });
});
