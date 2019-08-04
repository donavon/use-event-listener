import { testHook, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import useEventListener from '../src';


const mouseMoveEvent = { clientX: 100, clientY: 200 };
let hackHandler = null;
let useCaptureHandler = null;

const mockElement = {
  addEventListener: (eventName, handler, useCapture = false) => {
    hackHandler = handler;
    useCaptureHandler = useCapture;
  },
  removeEventListener: () => {
    hackHandler = null;
    useCaptureHandler = null;
  },
  dispatchEvent: (event) => {
    hackHandler(event);
  },
};

afterEach(cleanup);

describe('useEventListener', () => {
  test('import useEventListener from "@use-it/event-listener"', () => {
    expect(typeof useEventListener).toBe('function');
  });

  test('you pass an `eventName`, `handler`, and an `element`', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');

    testHook(() => {
      useEventListener('foo', handler, mockElement);
    });

    expect(addEventListenerSpy).toBeCalled();
    expect(useCaptureHandler).toBe(false);

    mockElement.dispatchEvent(mouseMoveEvent);
    expect(handler).toBeCalledWith(mouseMoveEvent);

    addEventListenerSpy.mockRestore();
  });

  test('`element` is optional (defaults to `window`/`global`)', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(global, 'addEventListener');

    testHook(() => {
      useEventListener('foo', handler);
    });

    expect(addEventListenerSpy).toBeCalled();

    addEventListenerSpy.mockRestore();
  });

  test('you pass an additional `useCapture`', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');

    testHook(() => {
      useEventListener('foo', handler, mockElement, true);
    });

    expect(addEventListenerSpy).toBeCalled();
    expect(useCaptureHandler).toBe(true);

    mockElement.dispatchEvent(mouseMoveEvent);
    expect(handler).toBeCalledWith(mouseMoveEvent);

    addEventListenerSpy.mockRestore();
  });

  test('fails safe with SSR (i.e. no window)', () => {
    const handler = jest.fn();

    testHook(() => {
      useEventListener('foo', handler, {});
    });
  });
});
