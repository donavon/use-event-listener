import { renderHook } from '@testing-library/react-hooks';

import useEventListener from '../src';

type Options = {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
};

const mouseMoveEvent = new MouseEvent('mousemove', {
  clientX: 100,
  clientY: 200,
});

const createMockElement = () => {
  let hackHandler: EventListenerOrEventListenerObject | null = null;

  const mockElement: EventTarget = {
    addEventListener: (
      _eventName: string,
      handler: EventListenerOrEventListenerObject,
      _options: Options
    ) => {
      hackHandler = handler;
    },
    removeEventListener: () => {
      hackHandler = null;
    },
    dispatchEvent: (event: Event) => {
      if (hackHandler!.hasOwnProperty('handleEvent')) {
        (hackHandler! as EventListenerObject).handleEvent(event);
      } else {
        (hackHandler! as EventListener)(event);
      }
      return true;
    },
  };
  return mockElement;
};

describe('useEventListener', () => {
  test('import useEventListener from "@use-it/event-listener"', () => {
    expect(typeof useEventListener).toBe('function');
  });

  test('you pass an `eventName`, `handler`, and an `element`', async () => {
    const handler = jest.fn();
    const mockElement = createMockElement();
    const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');

    renderHook(() =>
      useEventListener('foo', handler, { element: mockElement })
    );

    expect(addEventListenerSpy).toBeCalled();

    mockElement.dispatchEvent(mouseMoveEvent);
    expect(handler).toBeCalledWith(mouseMoveEvent);

    addEventListenerSpy.mockRestore();
  });

  test('you pass an `eventName`, `handler Object`, and an `element`', async () => {
    const handlerObject = {
      handleEvent: jest.fn(),
    };
    const mockElement = createMockElement();

    const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');

    renderHook(() =>
      useEventListener('foo', handlerObject, { element: mockElement })
    );

    expect(addEventListenerSpy).toBeCalled();

    mockElement.dispatchEvent(mouseMoveEvent);
    expect(handlerObject.handleEvent).toBeCalledWith(mouseMoveEvent);

    addEventListenerSpy.mockRestore();
  });

  test('`element` is optional (defaults to `window`/`global`)', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(global, 'addEventListener');

    renderHook(() => useEventListener('foo', handler));

    expect(addEventListenerSpy).toBeCalled();

    addEventListenerSpy.mockRestore();
  });

  test('does not add event listener to `window` if `element` is `null` (i.e. SSR)', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(global, 'addEventListener');

    renderHook(() => useEventListener('foo', handler, { element: null }));

    expect(addEventListenerSpy).not.toBeCalledWith('foo', handler);
  });

  test('`options` are passed to `addEventListener`', () => {
    const handler = jest.fn();
    const mockElement = createMockElement();

    const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');

    renderHook(() => {
      useEventListener('foo', handler, {
        capture: true,
        passive: true,
        element: mockElement,
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
    const mockElement = createMockElement();
    const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');

    const { rerender } = renderHook(() => {
      useEventListener('foo', handler, {
        capture: true,
        passive: true,
        element: mockElement,
      });
    });
    const numberOfCalls = addEventListenerSpy.mock.calls.length;

    rerender(() => {
      useEventListener('foo', handler, {
        capture: true,
        passive: true,
        element: mockElement,
      });
    });
    expect(addEventListenerSpy).toBeCalledTimes(numberOfCalls);

    addEventListenerSpy.mockRestore();
  });
});
