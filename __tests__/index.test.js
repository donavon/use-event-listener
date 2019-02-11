import { testHook, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import useEventListener from '../src';

afterEach(cleanup);

describe('useDarkMode', () => {
  test('import useEventListener from "@use-it/event-listener"', () => {
    expect(typeof useEventListener).toBe('function');
  });
});
