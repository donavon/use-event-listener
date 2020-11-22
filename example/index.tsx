import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useEventListener from '../src';

const useMouseMove = () => {
  const [coords, setCoords] = React.useState([0, 0]);
  useEventListener(
    'mousemove',
    ({ clientX, clientY }: MouseEvent) => {
      setCoords([clientX, clientY]);
    },
    { passive: true }
  );
  return coords;
};

const useKeyDown = () => {
  const [key, setKey] = React.useState('');
  useEventListener('keydown', (ev: KeyboardEvent) => {
    setKey(ev.key);
  });
  return key;
};

const App = () => {
  const [x, y] = useMouseMove();
  const key = useKeyDown();
  return (
    <h1>
      <div>
        The mouse position is ({x}, {y})
      </div>
      <div>Last key pressed: {key}</div>
    </h1>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
